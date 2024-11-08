import { Money } from "../values/money"
import { PaymentStatus, PaymentType } from "./payment-enums"
import { PaymentParty } from "./payment-party"

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
