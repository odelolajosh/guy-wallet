import { Currency } from "@/domain/values/money";
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
   * Get the wallet by account number
   * @param accountNumber 
   */
  getWalletByAccountNumber(accountNumber: string): Promise<Wallet>;
}
