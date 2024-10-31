import { IPaymentProvider, PaymentResponse, PaymentVerificationResponse, VirtualAccountDetails } from "@/application/payment/payment-provider"
import { Money } from "@/domain/common/money"
import { PaymentParty } from "@/domain/payment/model"
import { IConfiguration } from "@/infrastructure/config/interfaces"
import axios from "axios"

export class GuyPaymentProvider implements IPaymentProvider {
  private transactions = new Map<string, PaymentVerificationResponse>()
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
        amount: amount.value,
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

  async verifyTransaction(transactionId: string): Promise<PaymentVerificationResponse> {
    console.log(`Mock: Verifying transaction ${transactionId}`)
    
    const transaction = this.transactions.get(transactionId)
    if (!transaction) {
      throw new Error(`Mock: Transaction ${transactionId} not found`)
    }

    return transaction
  }
}
