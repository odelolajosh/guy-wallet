import { IPaymentProvider, PaymentResponse, PaymentVerificationResponse, VirtualAccountDetails } from "@/application/payment/payment-provider";

export class GuyPaymentProvider implements IPaymentProvider {
  private transactions = new Map<string, PaymentVerificationResponse>();

  async createVirtualAccount(userId: string): Promise<VirtualAccountDetails> {
    userId; // eslint-disable-line
    const accountNumber = `123456${Math.floor(Math.random() * 10000)}`;
    const bankName = "Guy Bank";
    const reference = `guy-ref-${Date.now()}`;

    return {
      accountNumber,
      bankName,
      reference,
    };
  }

  async processPayment(amount: number, currency: string, reference: string): Promise<PaymentResponse> {
    console.log(`Mock: Processing payment of ${amount} ${currency} with reference ${reference}`);

    const success = Math.random() > 0.2; // 80% chance of success
    const transactionId = `mock-tx-${Date.now()}`;

    this.transactions.set(transactionId, {
      status: success ? "success" : "failed",
      amount,
      currency,
      verified: success,
    });

    return {
      status: success ? "success" : "failed",
      transactionId,
    };
  }

  async verifyTransaction(transactionId: string): Promise<PaymentVerificationResponse> {
    console.log(`Mock: Verifying transaction ${transactionId}`);
    
    const transaction = this.transactions.get(transactionId);
    if (!transaction) {
      throw new Error(`Mock: Transaction ${transactionId} not found`);
    }

    return transaction;
  }
}
