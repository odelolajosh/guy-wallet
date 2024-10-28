import { Money } from "../common/money"

export type PaymentParty = {
  type: "bank"
  bankName: string
  accountNumber: string
  accountName: string
} | {
  type: "wallet"
  walletId: string
}

export enum PaymentStatus {
  Pending = "pending",
  Completed = "completed",
  Failed = "failed"
}

export enum PaymentType {
  Transfer = "transfer",
  Subscription = "subscription",
  Deposit = "deposit",
}

type CreatePaymentParams = {
  id: string
  amount: Money
  description: string
  from: PaymentParty
  to: PaymentParty
  type: PaymentType
  status?: PaymentStatus
  createdAt?: Date
  updatedAt?: Date
}

export class Payment {
  constructor(
    public id: string,
    public amount: Money,
    public description: string,
    public from: PaymentParty,
    public to: PaymentParty,
    public type: PaymentType,
    public status: PaymentStatus = PaymentStatus.Pending,
    public createdAt: Date = new Date(),
    public updatedAt: Date = new Date()
  ) { }

  static create({
    id,
    amount,
    description,
    from,
    to,
    type,
    status = PaymentStatus.Pending,
    createdAt = new Date(),
    updatedAt = new Date()
  }: CreatePaymentParams): Payment {
    return new Payment(id, amount, description, from, to, type, status, createdAt, updatedAt)
  }
}