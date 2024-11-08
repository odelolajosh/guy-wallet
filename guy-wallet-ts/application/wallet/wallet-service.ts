import { IWalletRepository } from "@/domain/wallet/repository"
import { Wallet } from "@/domain/wallet/model"
import { IWalletService } from "./wallet-interface"
import { IPaymentProvider } from "../payment/payment-provider"
import { VirtualAccountCreationError, WalletNotFoundError } from "./wallet-error"
import { Currency } from "@/domain/values/money"

export class WalletService implements IWalletService {
  constructor(
    private walletRepository: IWalletRepository,
    private paymentProvider: IPaymentProvider,
  ) { }

  async createWallet(userId: string, currency: string): Promise<Wallet> {
    const account = await this.paymentProvider.createVirtualAccount(userId)
    if (!account) {
      throw new VirtualAccountCreationError()
    }

    const wallet = Wallet.create({
      userId,
      currency: currency as Currency,
      accountNumber: account.accountNumber,
      bankName: account.bankName
    })
    wallet.id = await this.walletRepository.create(wallet)
    return wallet
  }

  async getWalletById(walletId: string): Promise<Wallet> {
    const wallet = await this.walletRepository.getById(walletId)
    if (!wallet) {
      throw new WalletNotFoundError()
    }
    return wallet
  }

  async getWalletsByUserId(userId: string): Promise<Wallet[]> {
    const wallets = this.walletRepository.getByUserId(userId)
    if (!wallets) {
      throw new WalletNotFoundError()
    }
    return wallets
  }

  async getWalletByAccountNumber(accountNumber: string): Promise<Wallet> {
    const wallet = await this.walletRepository.getByAccountNumber(accountNumber)
    if (!wallet) {
      throw new WalletNotFoundError()
    }
    return wallet
  }
}
