import { Money, WalletStatus } from "./values";

/**
 * Wallet model
 */
export class Wallet {
  constructor(
    public id: string,
    public name: string,
    public balance: Money,
    public userId: string,
    public status: WalletStatus = WalletStatus.ACTIVE,
    public createdAt: Date = new Date(),
    public updatedAt: Date = new Date()
  ) { }

  static create(userId: string, currency: string): Wallet {
    return new Wallet("", currency, new Money(currency), userId);
  }
}
