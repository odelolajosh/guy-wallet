import { Payment, PaymentStatus } from "@/domain/payment/model";
import { IQueueJob, IQueueWorkerProcessor } from "../queue/queue-interface";
import { IPaymentProvider } from "./payment-provider";
import { IWalletRepository } from "@/domain/wallet/repository";
import { IPaymentRepository } from "@/domain/payment/repository";
import { InvalidPaymentPartyError } from "./payment-error";

/**
 * @class PaymentProcessor
 * A queue worker processor for processing payments
 */
export class PaymentProcessor implements IQueueWorkerProcessor<Payment> {
  constructor(private paymentProvider: IPaymentProvider, private paymentRepository: IPaymentRepository) { }

  async process(job: IQueueJob<Payment>): Promise<void> {
    // payment initiator is obviously the user with a wallet id

    const payment = job.data
    if (payment.to.type == "bank") {
      await this.paymentProvider.processPayment(payment.to, payment.amount, payment.reference)
    }
  }

  async onCompleted(job: IQueueJob<Payment>): Promise<void> {
    // Would want to update payment status here but it's not necessary
    // since the payment status is initially set to pending
  }

  async onFailed(error: Error, job?: IQueueJob<Payment>): Promise<void> {
    console.error("Payment processing failed", error)
    if (job?.data) {
      const payment = job.data
      payment.status = PaymentStatus.Failed
      await this.paymentRepository.update(payment)
    }
  }
}

export class PaymentFinalizer implements IQueueWorkerProcessor<Payment> {
  constructor(private walletRepository: IWalletRepository, private paymentRepository: IPaymentRepository) { }

  async process(job: IQueueJob<Payment>): Promise<void> {
    const payment = job.data

    const from = payment.from.toJSON(), to = payment.to.toJSON()

    if (from.type == "wallet" && to.type == "wallet") {
      // Transfer between wallets
      await this.walletRepository.transferMoney(from.walletId, to.walletId, payment.amount)
    } else if (from.type == "wallet" && to.type == "bank") {
      // Withdraw from wallet
      await this.walletRepository.updateBalance(from.walletId, payment.amount.negate())
    } else if (from.type == "bank" && to.type == "wallet") {
      // Deposit to wallet
      await this.walletRepository.updateBalance(to.walletId, payment.amount)
    } else {
      throw new InvalidPaymentPartyError()
    }
  }

  async onCompleted(job: IQueueJob<Payment>): Promise<void> {
    const payment = job.data
    payment.status = PaymentStatus.Completed
    await this.paymentRepository.update(payment)
  }

  async onFailed(error: Error, job?: IQueueJob<Payment>): Promise<void> {
    console.error("Payment finalization failed", error)
    if (job?.data) {
      const payment = job.data
      payment.status = PaymentStatus.Failed
      await this.paymentRepository.update(payment)
    }
  }
}
