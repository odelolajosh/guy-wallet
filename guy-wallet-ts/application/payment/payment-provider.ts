import { Money } from "@/domain/common/money";
import { PaymentParty } from "@/domain/payment/model";

export interface IPaymentProvider {
  /**
   * Creates a virtual account for the user to fund their wallet
   * @param userId The unique user identifier
   */
  createVirtualAccount(userId: string): Promise<VirtualAccountDetails | null>;

  /**
   * Processes a payment transaction
   * @param amount The amount to be processed
   * @param currency The currency for the transaction
   * @param reference A unique reference for the transaction
   */
  processPayment(to: PaymentParty, amount: Money, reference: string): Promise<PaymentResponse | null>;

  /**
   * Verifies a transaction
   * @param transactionId The transaction identifier
   */
  verifyTransaction(reference: string): Promise<PaymentResponse>;
}

// Types for responses
export interface VirtualAccountDetails {
  accountNumber: string;
  bankName: string;
  reference: string;
}

export interface PaymentResponse {
  status: string; // e.g., 'success' or 'failed'
  amount: number;
  currency: string;
  reason: string;
  recipient: {
    accountNumber: string;
    accountName: string;
    bankName: string;
  };
  createdAt: Date;
}
