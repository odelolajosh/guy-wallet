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
   * Create a payment
   * @param from The payment party
   * @param to The payment party
   * @param type The payment type
   * @param amount The amount
   * @returns The payment
   */
  createPendingPayment(params: {
    from: PaymentParty;
    to: PaymentParty;
    type: PaymentType;
    amount: Money;
    reason?: string;
  }): Promise<Payment>;

  /**
   * Get payment by reference
   * @param reference The payment reference
   * @returns The payment
   */
  getPaymentByReference(reference: string): Promise<Payment>;
}
