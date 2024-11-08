import { Payment } from "@/domain/payment/payment";
import { IQueueJob, IQueueWorkerProcessor } from "../queue/queue-interface";
import { IPaymentProvider } from "./payment-provider";
import { IWalletRepository } from "@/domain/wallet/repository";
import { IPaymentRepository } from "@/domain/payment/repository";
import { InvalidPaymentPartyError } from "./payment-error";
import { Currency, Money } from "@/domain/values/money";
import { PaymentStatus } from "@/domain/payment/payment-enums";

interface PaymentData extends Omit<Payment, "amount"> {
  amount: string
  currency: Currency
}

function deserializePayment(data: PaymentData): Payment {
  return new Payment(
    data.id,
    new Money(data.currency, data.amount),
    data.reason,
    data.from,
    data.to,
    data.type,
    data.reference,
    data.status,
    data.createdAt,
    data.updatedAt
  )
}

function serializePayment(payment: Payment): PaymentData {
  return {
    id: payment.id,
    amount: payment.amount.toString(),
    currency: payment.amount.currency,
    reason: payment.reason,
    from: payment.from,
    to: payment.to,
    type: payment.type,
    reference: payment.reference,
    status: payment.status,
    createdAt: payment.createdAt,
    updatedAt: payment.updatedAt
  }
}

/**
 * @class PaymentProcessor
 * A queue worker processor for processing payments
 */
export class PaymentProcessor implements IQueueWorkerProcessor<PaymentData> {
  
  constructor(
    private paymentProvider: IPaymentProvider,
    private paymentRepository: IPaymentRepository,
  ) { }

  async process(job: IQueueJob<PaymentData>): Promise<void> {
    // payment initiator is obviously the user with a wallet id
    const paymentData = job.data

    if (paymentData.to.type == "bank") {
      const amount = new Money(paymentData.currency, paymentData.amount)
      await this.paymentProvider.processPayment(paymentData.to, amount, paymentData.reference)
    }
  }

  async onCompleted(job: IQueueJob<PaymentData>): Promise<void> {
    // Would want to update payment status here but it's not necessary
    // since the payment status is initially set to pending
  }

  async onFailed(error: Error, job?: IQueueJob<PaymentData>): Promise<void> {
    console.error("Payment processing failed", error)
    if (job?.data) {
      const payment = deserializePayment(job.data)
      payment.status = PaymentStatus.Failed
      await this.paymentRepository.update(payment)
    }
  }
}

export class PaymentFinalizer implements IQueueWorkerProcessor<PaymentData> {
  constructor(
    private walletRepository: IWalletRepository,
    private paymentRepository: IPaymentRepository
  ) { }

  async process(job: IQueueJob<PaymentData>): Promise<void> {
    const payment = deserializePayment(job.data)

    if (payment.from.type == "wallet" && payment.to.type == "wallet") {
      // Transfer between wallets
      await this.walletRepository.transferMoney(payment.from.walletId!, payment.to.walletId!, payment.amount)
    } else if (payment.from.type == "wallet" && payment.to.type == "bank") {
      // Withdraw from wallet
      await this.walletRepository.fundWallet(payment.from.walletId!, payment.amount.negate())
    } else if (payment.from.type == "bank" && payment.to.type == "wallet") {
      // Deposit to wallet
      await this.walletRepository.fundWallet(payment.to.walletId!, payment.amount)
    } else {
      throw new InvalidPaymentPartyError()
    }
  }

  async onCompleted(job: IQueueJob<PaymentData>): Promise<void> {
    const payment = deserializePayment(job.data)
    payment.status = PaymentStatus.Completed
    await this.paymentRepository.update(payment)
  }

  async onFailed(error: Error, job?: IQueueJob<PaymentData>): Promise<void> {
    console.error("Payment finalization failed", error)
    if (job?.data) {
      const payment = deserializePayment(job.data)
      payment.status = PaymentStatus.Failed
      await this.paymentRepository.update(payment)
    }
  }
}
