import { IPaymentProvider, PaymentResponse, VirtualAccountDetails } from "@/application/payment/payment-provider";
import { Money } from "@/domain/values/money";
import { PaymentParty } from "@/domain/payment/payment";

export class TestPaymentProvider implements IPaymentProvider {
  payments = new Map<string, PaymentResponse>()

  async createVirtualAccount(userId: string): Promise<VirtualAccountDetails | null> {
    const reference = `test-ref-${userId}`
    const accountNumber = Math.floor(Math.random() * 10000000000).toString()
    return {
      accountNumber,
      bankName: "Test Bank",
      reference
    }
  }

  async processPayment(to: PaymentParty, money: Money, reference: string): Promise<PaymentResponse | null> {
    if (to.type !== "bank") {
      return null
    }
  
    const payment: PaymentResponse = {
      status: "success",
      amount: money.toNumber(),
      currency: money.currency,
      reason: "Payment processed successfully",
      createdAt: new Date(),
      recipient: {
        accountNumber: to.accountNumber!,
        accountName: to.accountName!,
        bankName: to.bankName!
      }
    }
    this.payments.set(reference, payment)
    return payment
  }

  async verifyTransaction(reference: string): Promise<PaymentResponse> {
    const payment = this.payments.get(reference)
    if (!payment) {
      throw new Error("Payment not found")
    }
    return payment
  }
}
