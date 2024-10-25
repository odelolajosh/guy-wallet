import { IWalletRepository } from "@/domain/wallet/repository";
import { IWalletService } from "./interfaces";
import { Wallet } from "@/domain/wallet/model";
import { ApplicationError } from "../app-error";

export class WalletService implements IWalletService {
  constructor(private walletRepository: IWalletRepository) { }

  async createWallet(userId: string, currency: string): Promise<Wallet> {
    const wallet = Wallet.create(userId, currency);
    wallet.id = await this.walletRepository.create(wallet);
    return wallet;
  }

  getWalletById(walletId: string): Promise<Wallet> {
    const wallet = this.walletRepository.getById(walletId);
    if (!wallet) {
      throw new ApplicationError("Wallet not found", 404);
    }
    return wallet;
  }

  getWalletsByUserId(userId: string): Promise<Wallet[]> {
    const wallets = this.walletRepository.getByUserId(userId);
    if (!wallets) {
      throw new ApplicationError("Wallet not found", 404);
    }
    return wallets;
  }

  deposit(walletId: string, amount: number): Promise<void> {
    throw new Error("Method not implemented.");
  }

  withdraw(walletId: string, amount: number): Promise<void> {
    throw new Error("Method not implemented.");
  }

  transfer(fromWalletId: string, toWalletId: string, amount: number): Promise<void> {
    throw new Error("Method not implemented.");
  }
}