import { Wallet } from "@/domain/wallet/model";
import { IWalletRepository } from "@/domain/wallet/repository";
import { PostgresClient } from "../postgres";
import { Money } from "@/domain/wallet/values";

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

  async create(wallet: Wallet): Promise<string> {
    const result = await this.client.query(`
      INSERT INTO wallets (id, name, amount, currency, created_at, updated_at)
      VALUES ($1, $2, $3, $4, $5, $6)`,
      [wallet.id, wallet.name, wallet.balance.amount, wallet.balance.currency, wallet.createdAt, wallet.updatedAt]
    )
    return result.rows[0].id
  }

  update(wallet: Wallet): Promise<void> {
    throw new Error("Method not implemented.");
  }

  private toWallet(row: any) {
    return new Wallet(
      row.id,
      row.name,
      new Money(row.currency, row.amount),
      row.user_id,
      row.status,
      new Date(row.created_at),
      new Date(row.updated_at)
    )
  }

}