import { Money } from "@/domain/common/money"
import { Wallet } from "@/domain/wallet/model"
import { IWalletRepository } from "@/domain/wallet/repository"

export class TestWalletRepository implements IWalletRepository {
  private wallets: Wallet[] = []

  async getById(walletId: string): Promise<Wallet | null> {
    const wallet = this.wallets.find(wallet => wallet.id === walletId) || null
    return wallet
  }

  async getByUserId(userId: string): Promise<Wallet[]> {
    const userWallets = this.wallets.filter(wallet => wallet.userId === userId)
    return Promise.resolve(userWallets)
  }

  async getByAccountNumber(accountNumber: string): Promise<Wallet | null> {
    const wallet = this.wallets.find(wallet => wallet.accountNumber === accountNumber) || null
    return wallet
  }

  async create(wallet: Wallet): Promise<string> {
    this.wallets.push(wallet)
    return Math.random().toString(36).slice(2)
  }

  async update(wallet: Wallet): Promise<Wallet | null> {
    const index = this.wallets.findIndex(w => w.id === wallet.id)
    if (index === -1) {
      return null
    }
    const updatedWallet = { ...this.wallets[index], ...wallet, updatedAt: new Date() }
    this.wallets[index] = updatedWallet
    return updatedWallet
  }

  async transferMoney(fromWalletId: string, toWalletId: string, amount: Money): Promise<boolean> {
    return false
  }

  async fundWallet(walletId: string, amountChange: Money): Promise<boolean> {
    return false
  }
}
