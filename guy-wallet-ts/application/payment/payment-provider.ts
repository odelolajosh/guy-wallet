export interface IPaymentProvider {
  /**
   * Creates a virtual account for the user to fund their wallet
   * @param userId The unique user identifier
   */
  createVirtualAccount(userId: string): Promise<VirtualAccountDetails>;

  /**
   * Processes a payment transaction
   * @param amount The amount to be processed
   * @param currency The currency for the transaction
   * @param reference A unique reference for the transaction
   */
  processPayment(amount: number, currency: string, reference: string): Promise<PaymentResponse>;

  /**
   * Verifies a transaction
   * @param transactionId The transaction identifier
   */
  verifyTransaction(transactionId: string): Promise<PaymentVerificationResponse>;
}

// Types for responses
export interface VirtualAccountDetails {
  accountNumber: string;
  bankName: string;
  reference: string;
}

export interface PaymentResponse {
  status: string; // e.g., 'success' or 'failed'
  transactionId: string;
}

export interface PaymentVerificationResponse {
  status: string; // e.g., 'success', 'pending', or 'failed'
  amount: number;
  currency: string;
  verified: boolean;
}
