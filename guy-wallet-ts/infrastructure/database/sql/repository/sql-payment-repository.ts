import { Payment, PaymentParty } from "@/domain/payment/model";
import { IPaymentRepository } from "@/domain/payment/repository";
import { PostgresClient } from "../postgres";
import { Money } from "@/domain/common/money";

export class SqlPaymentRepository implements IPaymentRepository {
  constructor(private client: PostgresClient) { }

  async getById(paymentId: string): Promise<Payment | null> {
    const result = await this.client.query("SELECT * FROM payments WHERE id = $1", [paymentId])
    if (result.rowCount == 0) {
      return null
    }
    return this.toPayment(result.rows[0])
  }

  async getByUserId(userId: string): Promise<Payment[]> {
    const result = await this.client.query(`
      SELECT p.* FROM payments p
      JOIN wallets w ON (p.from_wallet_id = w.id OR p.to_wallet_id = w.id)
      WHERE w.user_id = $1`,
      [userId]
    )
    return result.rows.map(this.toPayment)
  }

  async getByReference(reference: string): Promise<Payment | null> {
    const result = await this.client.query("SELECT * FROM payments WHERE reference = $1", [reference])
    if (result.rowCount == 0) {
      return null
    }
    return this.toPayment(result.rows[0])
  }

  async getByWalletId(walletId: string): Promise<Payment[]> {
    const result = await this.client.query(`
      SELECT * FROM payments
      WHERE to_wallet_id = $1 OR from_wallet_id = $1`
      , [walletId])
    return result.rows.map(this.toPayment)
  }

  async create(payment: Payment): Promise<string> {
    const getPartyValues = (party: PaymentParty) => {
      return party.type === "bank"
        ? [party.type, null, party.bankName, party.accountName, party.accountNumber]
        : [party.type, party.walletId, null, null, null]
    };

    const result = await this.client.query(
      `
        INSERT INTO payments (
          amount, currency, reference,
          to_type, to_wallet_id, to_bank_name, to_account_name, to_account_number,
          from_type, from_wallet_id, from_bank_name, from_account_name, from_account_number, 
          status, reason
        ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15)
        RETURNING id`,
      [
        payment.amount.value,
        payment.amount.currency,
        payment.reference,
        ...getPartyValues(payment.to),
        ...getPartyValues(payment.from),
        payment.status,
        payment.reason,
      ]
    )

    return result.rows[0].id
  }

  async update(payment: Payment): Promise<Payment> {
    const result = await this.client.query(`
      UPDATE payments
      SET status = $2, updated_at = $3
      WHERE id = $1 RETURNING *`,
      [payment.id, payment.status, new Date()]
    )
    return this.toPayment(result.rows[0])
  }

  private toPayment(row: any): Payment {
    return Payment.create({
      id: row.id,
      amount: new Money(row.currency, row.amount),
      reason: row.reason,
      reference: row.reference,
      from: PaymentParty.create({
        type: row.from_type,
        walletId: row.from_wallet_id,
        bankName: row.from_bank_name,
        accountName: row.from_account_name,
        accountNumber: row.from_account_number
      }),
      to: PaymentParty.create({
        type: row.to_type,
        walletId: row.to_wallet_id,
        bankName: row.to_bank_name,
        accountName: row.to_account_name,
        accountNumber: row.to_account_number
      }),
      type: row.type,
      status: row.status,
      createdAt: row.created_at,
      updatedAt: row.updated_at
    })
  }
}
