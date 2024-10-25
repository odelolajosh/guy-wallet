import { Wallet } from "@/domain/wallet/model";
import { Currency } from "@/domain/wallet/values";

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
  * Deposit money to the wallet
  * @param walletId The wallet id
  * @param amount The amount to deposit
  */
  deposit(walletId: string, amount: number): Promise<void>;

  /**
  * Withdraw money from the wallet
  * @param walletId The wallet id
  * @param amount The amount to withdraw
  */
  withdraw(walletId: string, amount: number): Promise<void>;

  /**
  * Transfer money from one wallet to another
  * @param fromWalletId The wallet id to transfer from
  * @param toWalletId The wallet id to transfer to
  * @param amount The amount to transfer
  */
  transfer(fromWalletId: string, toWalletId: string, amount: number): Promise<void>;
}