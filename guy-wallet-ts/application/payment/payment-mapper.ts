import { Payment } from "@/domain/payment/payment";
import { Currency, Money } from "@/domain/values/money";

export interface PaymentData extends Omit<Payment, "amount"> {
  amount: string
  currency: Currency
}

export class PaymentMapper {
  static toData(payment: Payment): PaymentData {
    return {
      id: payment.id,
      amount: payment.amount.toString(),
      currency: payment.amount.currency,
      reason: payment.reason,
      from: payment.from,
      to: payment.to,
      type: payment.type,
      reference: payment.reference,
      status: payment.status,
      createdAt: payment.createdAt,
      updatedAt: payment.updatedAt
    };
  }

  static fromData(data: PaymentData): Payment {
    return new Payment(
      data.id,
      new Money(data.currency, data.amount),
      data.reason,
      data.from,
      data.to,
      data.type,
      data.reference,
      data.status,
      data.createdAt,
      data.updatedAt
    );
  }
}
