import { Payment } from "@/domain/payment/payment";
import { IPaymentRepository } from "@/domain/payment/repository";

export class TestPaymentRepository implements IPaymentRepository {
  private payments: Payment[] = []

  async getById(paymentId: string): Promise<Payment | null> {
    return this.payments.find((payment) => payment.id == paymentId) ?? null
  }

  async getByUserId(_userId: string): Promise<Payment[]> {
    return []
  }

  async getByReference(reference: string): Promise<Payment | null> {
    return this.payments.find((payment) => payment.reference == reference) ?? null
  }

  async getByWalletId(walletId: string): Promise<Payment[]> {
    const payments = this.payments.filter((payment) => (
      (payment.from.type == "wallet" && payment.from.walletId == walletId) ||
      (payment.to.type == "wallet" && payment.to.walletId == walletId)
    ))
    return payments
  }

  async create(payment: Payment): Promise<string> {
    const id = Math.random().toString(36).substring(7)
    this.payments.push({ ...payment, id })
    return id
  }

  async update(payment: Payment): Promise<Payment | null> {
    const index = this.payments.findIndex((pmt) => pmt.id == payment.id)
    if (index == -1) {
      return null
    }

    this.payments[index].status = payment.status
    this.payments[index].updatedAt = new Date()
    return this.payments[index]
  }
}