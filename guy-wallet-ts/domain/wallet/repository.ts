import { Money } from "../values/money";
import { Wallet } from "./model";

/**
 * Defines the wallet repository interface
 */
export interface IWalletRepository {
  /**
   * Get the wallet by id
   * @param walletId The wallet id
   */
  getById(walletId: string): Promise<Wallet | null>;

  /**
   * Get the wallet by user id
   * @param userId The user id
   */
  getByUserId(userId: string): Promise<Wallet[]>;

  /**
   * Get the wallet by account number
   * @param accountNumber The account number
   */
  getByAccountNumber(accountNumber: string): Promise<Wallet | null>;

  /**
   * Create a new wallet
   * Doesn't use the wallet id specified in the wallet object, but generates a new one
   * @param wallet The wallet object
   * @returns The wallet id
   */
  create(wallet: Wallet): Promise<string>;

  /**
   * Update the wallet
   * @param wallet The wallet object
   */
  update(wallet: Wallet): Promise<Wallet | null>;

  /**
   * Transfer money between wallets
   * @param fromWalletId The wallet id to transfer from
   * @param toWalletId The wallet id to transfer to
   * @param money The amount to transfer
   */
  transferMoney(fromWalletId: string, toWalletId: string, money: Money): Promise<boolean>

  /**
   * Fund the wallet
   * @param walletId The wallet id
   * @param money The amount to change
   */
  fundWallet(walletId: string, money: Money): Promise<boolean>
}
