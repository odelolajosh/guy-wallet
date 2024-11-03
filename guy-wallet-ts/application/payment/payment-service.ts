import { IPaymentRepository } from "@/domain/payment/repository"
import { IPaymentService } from "./payment-interface"
import { Payment, PaymentParty, PaymentType } from "@/domain/payment/model"
import { Money } from "@/domain/common/money"
import { PaymentNotFoundError } from "./payment-error"

export class PaymentService implements IPaymentService {
  constructor(private paymentRepository: IPaymentRepository) { }

  async getPaymentByUserId(userId: string): Promise<Payment[]> {
    return this.paymentRepository.getByUserId(userId)
  }

  async getPaymentsByWalletId(walletId: string): Promise<Payment[]> {
    return this.paymentRepository.getByWalletId(walletId)
  }

  async createPayment({ from, to, amount, type, reason = "Payment" }: {
    from: PaymentParty;
    to: PaymentParty;
    type: PaymentType;
    amount: Money;
    reason?: string;
  }): Promise<Payment> {
    const payment = new Payment("", amount, reason, from, to, type)
    payment.id = await this.paymentRepository.create(payment)
    return payment
  }

  async getPaymentByReference(reference: string): Promise<Payment> {
    const payment = await this.paymentRepository.getByReference(reference)
    if (!payment) {
      throw new PaymentNotFoundError()
    }
    return payment
  }
}
