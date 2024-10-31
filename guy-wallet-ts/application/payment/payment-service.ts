import { IPaymentRepository } from "@/domain/payment/repository"
import { IPaymentService } from "./payment-interface"
import { Payment, PaymentParty, PaymentStatus, PaymentType } from "@/domain/payment/model"
import { Money } from "@/domain/common/money"
import { IWalletRepository } from "@/domain/wallet/repository"
import { IQueue } from "../queue/queue-interface"
import { FinalizedPaymentError, InvalidPaymentPartyError, PaymentNotFoundError } from "./payment-error"

export class PaymentService implements IPaymentService {
  constructor(
    private walletRepository: IWalletRepository,
    private paymentRepository: IPaymentRepository,
    private paymentProcessingQueue: IQueue<Payment>
  ) { }

  async getPaymentsByWalletId(walletId: string): Promise<Payment[]> {
    return this.paymentRepository.getByWalletId(walletId)
  }

  async initializeTransfer(walletId: string, to: PaymentParty, type: PaymentType, amount: Money): Promise<Payment> {
    const from = new PaymentParty("wallet", walletId)

    const payment = new Payment("", amount, "Payment", from, to, type)
    payment.id = await this.paymentRepository.create(payment)

    await this.paymentProcessingQueue.enqueue(payment.id, payment)
    return payment
  }

  async finalizePayment(reference: string, status: PaymentStatus): Promise<void> {
    const payment = await this.paymentRepository.getByReference(reference)
    if (!payment) {
      throw new PaymentNotFoundError()
    }

    if (payment.status !== PaymentStatus.Pending) {
      throw new FinalizedPaymentError()
    }

    if (status === PaymentStatus.Failed) {
      // update payment status and return
      payment.status = PaymentStatus.Failed
      await this.paymentRepository.update(payment)
      return
    }

    const from = payment.from.toJSON()
    const to = payment.to.toJSON()

    if (from.type != "wallet") {
      // this should not be - only wallet from wallet can have reference
      // hence this function should not be called
      throw new InvalidPaymentPartyError()
    }

    if (to.type === "wallet") {
      await this.walletRepository.transferMoney(from.walletId, to.walletId, payment.amount)
    } else {
      await this.walletRepository.updateBalance(from.walletId, payment.amount.negate())
    }

    payment.status = PaymentStatus.Completed
    await this.paymentRepository.update(payment)
  }

  async receivePayment(recipientAccountNumber: string, amount: Money): Promise<void> {
    const wallet = await this.walletRepository.getByAccountNumber(recipientAccountNumber)
    if (!wallet) {
      throw new Error("Wallet not found")
    }

    await this.walletRepository.updateBalance(wallet.id, amount)
  }
}
