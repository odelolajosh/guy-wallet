import { Payment, PaymentStatus } from "@/domain/payment/model";
import { IQueueJob, IQueueWorkerProcessor } from "../queue/queue-interface";
import { IPaymentProvider } from "./payment-provider";
import { IWalletRepository } from "@/domain/wallet/repository";
import { IPaymentRepository } from "@/domain/payment/repository";

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
  constructor(private walletRepository: IWalletRepository) { }

  async process(job: IQueueJob<Payment>): Promise<void> {
    const payment = job.data
  }

  async onCompleted(job: IQueueJob<Payment>): Promise<void> {
    // update payment status
  }

  async onFailed(error: Error, job?: IQueueJob<Payment>): Promise<void> {
    // handle failed payment
  }
}