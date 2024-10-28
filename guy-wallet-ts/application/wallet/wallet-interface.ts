import { Currency, Money } from "@/domain/common/money";
import { PaymentParty, PaymentType } from "@/domain/payment/model";
import { Wallet } from "@/domain/wallet/model";

export interface IWalletService {
  /**
   * Create a new wallet
   * @param userId The user id
   * @param currency The currency
   */
  createWallet(userId: string, currency: Currency): Promise<Wallet>;

  /**
  * Get the wallet by id
  * @param walletId The wallet id
  */
  getWalletById(walletId: string): Promise<Wallet>;

  /**
  * Get the wallet by user id
  * @param userId The user id
  */
  getWalletsByUserId(userId: string): Promise<Wallet[]>;
  
  /**
   * Initialize a payment
   * @param to The payment party
   * @param type The payment type
   * @param amount The amount
   */
  initializePayment(walletId: string, to: PaymentParty, type: PaymentType, amount: Money): Promise<void>;

  /**
   * Finalize a payment
   * @param paymentId The payment id
   */
  finalizePayment(paymentId: string): Promise<void>
}
