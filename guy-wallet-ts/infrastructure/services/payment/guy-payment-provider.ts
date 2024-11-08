import { IPaymentProvider, PaymentResponse, VirtualAccountDetails } from "@/application/payment/payment-provider"
import { Money } from "@/domain/values/money"
import { PaymentParty } from "@/domain/payment/payment-party"
import { IConfiguration } from "@/infrastructure/config/interfaces"
import axios from "axios"

export class GuyPaymentProvider implements IPaymentProvider {
  private guyPaymentUrl: string

  constructor(configuration: IConfiguration) {
    const port = parseInt(configuration.get("GUY_PAYMENT_PORT"))
    this.guyPaymentUrl = `http://localhost:${port}`
  }

  async createVirtualAccount(userId: string): Promise<VirtualAccountDetails | null> {
    try {
      const response = await axios.post(`${this.guyPaymentUrl}/virtual-accounts`)
      return response.data
    } catch (error) {
      return null
    }
  }

  async processPayment(to: PaymentParty, amount: Money, reference: string): Promise<PaymentResponse | null> {
    if (to.type !== "bank") {
      return null
    }

    try {
      const response = await axios.post("http://localhost:3000/transfer", {
        amount: amount.toNumber(),
        currency: amount.currency,
        reference,
        recipient: {
          accountNumber: to.accountNumber,
          accountName: to.accountName,
          bankName: to.bankName,
        }
      })

      return {
        status: "success",
        amount: response.data.data.amount,
        currency: response.data.data.currency,
        reason: response.data.data.reason,
        createdAt: response.data.data.createdAt,
        recipient: {
          accountNumber: response.data.data.recipient.accountNumber,
          accountName: response.data.data.recipient.accountName,
          bankName: response.data.data.recipient.bankName,
        }
      }
    } catch (error) {
      return null
    }
  }

  async verifyTransaction(transactionId: string): Promise<PaymentResponse> {
    try {
      const response = await axios.get(`${this.guyPaymentUrl}/transactions/${transactionId}`)
      return response.data
    } catch (error) {
      throw new Error("Transaction not found")
    }
  }
}
