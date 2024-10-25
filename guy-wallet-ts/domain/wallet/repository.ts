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
  update(wallet: Wallet): Promise<void>;
}

