import { IWalletRepository } from "@/domain/wallet/repository"
import { Wallet } from "@/domain/wallet/model"
import { IWalletService } from "./wallet-interface"
import { IPaymentProvider } from "../payment/payment-provider"
import { WalletNotFoundError } from "./wallet-error"
import { Payment, PaymentParty, PaymentStatus, PaymentType } from "@/domain/payment/model"
import { IQueue } from "../queue/queue-interface"
import { IPaymentRepository } from "@/domain/payment/repository"
import { Currency, Money } from "@/domain/common/money"
import { ApplicationError } from "../app-error"

export class WalletService implements IWalletService {
  constructor(
    private paymentRepository: IPaymentRepository,
    private walletRepository: IWalletRepository,
    private paymentProvider: IPaymentProvider,
    private queue: IQueue<Payment>
  ) { }

  async createWallet(userId: string, currency: string): Promise<Wallet> {
    const account = await this.paymentProvider.createVirtualAccount(userId)
    const wallet = Wallet.create({
      userId,
      currency: currency as Currency,
      accountNumber: account.accountNumber,
      bankName: account.bankName,
      reference: account.reference,
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

  async initializePayment(walletId: string, to: PaymentParty, type: PaymentType, amount: Money): Promise<void> {
    // save payment for the transaction, status pending
    const from: PaymentParty = {
      type: "wallet",
      walletId,
    }

    let payment = new Payment("", amount, "Payment", from, to, type)
    payment = await this.paymentRepository.create(payment)

    // send request to payment provider queue
    await this.queue.enqueue(payment.id, payment)
  }

  async finalizePayment(paymentId: string): Promise<void> {
    const payment = await this.paymentRepository.getById(paymentId)
    if (!payment) {
      throw new ApplicationError("Payment not found", 404)
    }

    // 2. update parties wallet balance
    if (payment.from.type === "wallet") {
      if (payment.to.type === "wallet") {
        await this.walletRepository.transferMoney(payment.from.walletId, payment.to.walletId, payment.amount)
      } else {
        await this.walletRepository.updateBalance(payment.from.walletId, payment.amount.negate())
      }
    } else if (payment.to.type === "wallet") {
      await this.walletRepository.updateBalance(payment.to.walletId, payment.amount)
    }

    payment.status = PaymentStatus.Completed
    await this.paymentRepository.update(payment)
  }
}
