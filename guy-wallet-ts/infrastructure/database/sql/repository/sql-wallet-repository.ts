import { Wallet } from "@/domain/wallet/model";
import { IWalletRepository } from "@/domain/wallet/repository";
import { Money } from "@/domain/common/money";
import { PostgresClient } from "../postgres";

export class SqlWalletRepository implements IWalletRepository {
  constructor(private client: PostgresClient) { }

  async getById(walletId: string): Promise<Wallet | null> {
    const result = await this.client.query("SELECT * FROM wallets WHERE id = $1", [walletId])
    if (result.rowCount == 0) {
      return null
    }
    return this.toWallet(result.rows[0])
  }

  async getByUserId(userId: string): Promise<Wallet[]> {
    const result = await this.client.query("SELECT * FROM wallets WHERE user_id = $1", [userId])
    return result.rows.map(this.toWallet)
  }

  async getByAccountNumber(accountNumber: string): Promise<Wallet | null> {
    const result = await this.client.query("SELECT * FROM wallets WHERE account_number = $1", [accountNumber])
    if (result.rowCount == 0) {
      return null
    }
    return this.toWallet(result.rows[0])
  }

  async create(wallet: Wallet): Promise<string> {
    const result = await this.client.query(`
      INSERT INTO wallets (id, name, amount, balance, user_id, account_number, bank_name, reference, created_at, updated_at)
      VALUES ($1, $2, $3, $4, $5, $6)`,
      [wallet.id, wallet.name, wallet.balance.value, wallet.balance.currency, wallet.userId,
      wallet.accountNumber, wallet.bankName, wallet.reference, wallet.createdAt, wallet.updatedAt]
    )
    return result.rows[0].id
  }

  async update(wallet: Wallet): Promise<Wallet | null> {
    const result = await this.client.query(`
      UPDATE wallets
      SET name = $2, updatedAt = $3
      WHERE id = $1`,
      [wallet.id, wallet.name, new Date()]
    )
    return this.toWallet(result.rows[0])
  }

  async transferMoney(fromWalletId: string, toWalletId: string, amount: Money): Promise<boolean> {
    const txClient = await this.client.createTransactionClient()

    try {
      txClient.begin()
      
      txClient.query(
        `UPDATE wallets SET balance = balance - $2 WHERE id = $1`,
        [fromWalletId, amount.value]
      )

      txClient.query(
        `UPDATE wallets SET balance = balance + $2 WHERE id = $1`,
        [toWalletId, amount.value]
      )

      await txClient.commit()
      return true
    } catch (error) {
      await txClient.rollback()
      throw false
    }
  }

  async updateBalance(walletId: string, amountChange: Money): Promise<boolean> {
    const result = await this.client.query(`
      UPDATE wallets
      SET balance = balance + $2
      WHERE id = $1`,
      [walletId, amountChange.value]
    )
    return !!result.rowCount && result.rowCount > 0
  }

  private toWallet(row: any) {
    return new Wallet(
      row.id,
      row.name,
      new Money(row.currency, row.balance),
      row.user_id,
      row.account_number,
      row.bank_name,
      row.reference,
      row.status,
      new Date(row.created_at),
      new Date(row.updated_at)
    )
  }
}