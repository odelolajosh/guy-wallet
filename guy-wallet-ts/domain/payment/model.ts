import { Money } from "../common/money"

/**
 * Payment status represents the status of a payment transaction.
 */
export enum PaymentStatus {
  Pending = "pending",
  Completed = "completed",
  Failed = "failed"
}

/**
 * Payment type represents the type of a payment transaction.
 */
export enum PaymentType {
  Transfer = "transfer",
  Subscription = "subscription",
  Deposit = "deposit",
}

type PaymentPartyParams = {
  type: "bank"
  bankName: string
  accountNumber: string
  accountName: string
} | {
  type: "wallet"
  walletId: string
}

type CreatePaymentPartyParams = {
  type: "wallet" | "bank"
  walletId?: string
  bankName?: string
  accountNumber?: string
  accountName?: string
}

/**
 * Payment party represents a party in a payment transaction.
 * It can be a bank account or a wallet.
 */
export class PaymentParty {
  type: "wallet" | "bank";
  bankName?: string;
  accountNumber?: string;
  accountName?: string;
  walletId?: string;

  constructor(type: "wallet", id: string);
  constructor(type: "bank", id: string, accountNumber: string, accountName: string);
  constructor(type: "wallet" | "bank", id: string, accountNumber?: string, accountName?: string) {
    this.type = type;
    if (type === "bank") {
      this.bankName = id;
      this.accountNumber = accountNumber!;
      this.accountName = accountName!;
    } else {
      this.walletId = id;
    }
  }

  static create({
    type,
    walletId,
    bankName,
    accountNumber,
    accountName
  }: CreatePaymentPartyParams): PaymentParty {
    if (type === "bank") {
      return new PaymentParty("bank", bankName!, accountNumber!, accountName!)
    } else {
      return new PaymentParty("wallet", walletId!)
    }
  }

  /**
   * Create a new PaymentParty instance from a JSON object
   * Preferred for type safety
   * @returns JSON representation of the payment party
   */
  toJSON(): PaymentPartyParams {
    if (this.type === "bank") {
      return {
        type: "bank",
        bankName: this.bankName!,
        accountNumber: this.accountNumber!,
        accountName: this.accountName!
      }
    } else {
      return {
        type: "wallet",
        walletId: this.walletId!
      }
    }
  }
}

type CreatePaymentParams = {
  id: string
  amount: Money
  reason: string
  from: PaymentParty
  to: PaymentParty
  type: PaymentType
  reference?: string
  status?: PaymentStatus
  createdAt?: Date
  updatedAt?: Date
}

/**
 * Payment represents a payment transaction.
 */
export class Payment {
  constructor(
    public id: string,
    public amount: Money,
    public reason: string,
    public from: PaymentParty,
    public to: PaymentParty,
    public type: PaymentType,
    public readonly reference: string = '',
    public status: PaymentStatus = PaymentStatus.Pending,
    public createdAt: Date = new Date(),
    public updatedAt: Date = new Date()
  ) { }

  static create({
    id,
    amount,
    reason,
    from,
    to,
    type,
    reference,
    status = PaymentStatus.Pending,
    createdAt = new Date(),
    updatedAt = new Date()
  }: CreatePaymentParams): Payment {
    return new Payment(id, amount, reason, from, to, type, reference, status, createdAt, updatedAt)
  }
}