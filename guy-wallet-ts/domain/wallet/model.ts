import { Currency, Money } from "../common/money";
import { WalletStatus } from "./wallet-status";

type CreateWalletParams = {
  userId: string;
  currency: Currency;
  accountNumber: string;
  bankName: string;
  reference: string;
}

/**
 * Wallet model
 */
export class Wallet {
  constructor(
    public id: string,
    public name: string,
    public balance: Money,
    public userId: string,
    public accountNumber: string,
    public bankName: string,
    public reference: string,
    public status: WalletStatus = WalletStatus.ACTIVE,
    public createdAt: Date = new Date(),
    public updatedAt: Date = new Date()
  ) { }

  static create({
    userId,
    currency,
    accountNumber,
    bankName,
    reference,
  }: CreateWalletParams): Wallet {
    return new Wallet("", currency, new Money(currency), userId, accountNumber, bankName, reference);
  }
}
