import { Money } from "@/domain/values/money";
import { Payment } from "@/domain/payment/payment";
import { PaymentParty } from "@/domain/payment/payment-party";
import { PaymentType } from "@/domain/payment/payment-enums";

export interface IPaymentService {
  /**
   * Get payment by user id
   * @param userId The user id
   * @returns The payments
   */
  getPaymentByUserId(userId: string): Promise<Payment[]>;
  
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
  createPayment(params: {
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
