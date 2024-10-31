import { Money } from "@/domain/common/money";
import { Payment, PaymentParty, PaymentStatus, PaymentType } from "@/domain/payment/model";

export interface IPaymentService {
  /**
   * Get payments by wallet id
   * @param walletId The wallet id
   * @returns The payments
   */
  getPaymentsByWalletId(walletId: string): Promise<Payment[]>;

  /**
   * Initialize a payment
   * @param to The payment party
   * @param type The payment type
   * @param amount The amount
   */
  initializeTransfer(walletId: string, to: PaymentParty, type: PaymentType, amount: Money): Promise<Payment>;

  /**
   * Finalize a payment by reference
   * @param reference The payment reference
   * @param status The payment status
   */
  finalizePayment(reference: string, status: PaymentStatus): Promise<void>;

  /**
   * Receive payment to wallet through bank transfer
   * @param recipientAccountNumber The receipient account number
   * @param amount The amount
   */
  receivePayment(recipientAccountNumber: string, amount: Money): Promise<void>;
}
