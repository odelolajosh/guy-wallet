import { routeHandler } from "@/http/lib/route-handler"
import { Request, Response } from "@/http/types/http"
import { GuyWebhookRequestDto, InitializeTransferDTO, PaymentResponse, WalletParamsDto } from "./dto"
import { Payment, PaymentParty, PaymentStatus, PaymentType } from "@/domain/payment/model"
import { Currency, Money } from "@/domain/common/money"
import { IPaymentService } from "@/application/payment/payment-interface"
import { IQueue } from "@/application/queue/queue-interface"
import { IWalletService } from "@/application/wallet/wallet-interface"
import { AlreadyFinalizedPaymentError, InvalidPaymentPartyError } from "@/application/payment/payment-error"

export class PaymentController {
  constructor(
    private walletService: IWalletService,
    private paymentService: IPaymentService,
    private paymentProcessingQueue: IQueue<Payment>,
    private paymentFinalizationQueue: IQueue<Payment>
  ) {
    this.getPayments = this.getPayments.bind(this)
    this.initializeTransfer = this.initializeTransfer.bind(this)
    this.guyHandler = this.guyHandler.bind(this)
  }

  @routeHandler
  async getPayments(request: Request<{}, {}, WalletParamsDto>, response: Response) {
    const { walletId } = request.params

    const payments = await this.paymentService.getPaymentsByWalletId(walletId)
    response.json({
      payments
    })
  }

  @routeHandler
  async initializeTransfer(request: Request<InitializeTransferDTO, {}, WalletParamsDto>, response: Response<PaymentResponse>) {
    const { walletId } = request.params
    const { destination } = request.body

    const from = new PaymentParty("wallet", walletId)

    const to = destination.type === "wallet" ?
      new PaymentParty("wallet", destination.walletId) :
      new PaymentParty("bank", destination.bankName, destination.accountNumber, destination.accountName)

    const amount = new Money(request.body.currency, request.body.amount)

    const payment = await this.paymentService.createPayment({ from, to, type: PaymentType.Transfer, amount })
    if (to.type === "bank") {
      // Transfer is to a bank account, so we need to process the payment
      await this.paymentProcessingQueue.enqueue(payment.id, payment)
    } else {
      // This is an internal transfer, so we can finalize the payment immediately!
      await this.paymentFinalizationQueue.enqueue(payment.id, payment)
    }

    response.status(200).json({
      payment: this.toPaymentResponse(payment)
    })
  }

  @routeHandler
  async guyHandler(request: Request<GuyWebhookRequestDto>, response: Response) {
    const { transfer } = request.body

    let payment: Payment;

    if (transfer.reference) {
      // This transfer must have been initiated from the wallet
      // TODO: We might want to verify the reference to ensure it's valid
      payment = await this.paymentService.getPaymentByReference(transfer.reference)
      if (payment.status !== PaymentStatus.Pending) {
        throw new AlreadyFinalizedPaymentError()
      }
    } else if (transfer.receiverAccountNumber) {
      // An external transfer from a bank account to a wallet
      const wallet = await this.walletService.getWalletByAccountNumber(transfer.receiverAccountNumber)
      const to = new PaymentParty("wallet", wallet.id)
      const from = new PaymentParty("bank", transfer.senderBankName, transfer.senderAccountNumber, transfer.senderAccountName)
      const amount = new Money(transfer.currency as Currency, transfer.amount)
      payment = await this.paymentService.createPayment({ from, to, type: PaymentType.Transfer, amount, reason: transfer.reason })
    } else {
      // We don't have enough information to process this transfer
      throw new InvalidPaymentPartyError()
    }

    await this.paymentFinalizationQueue.enqueue(payment.id, payment)
    response.status(200).json({
      message: "Payment processing initiated successfully"
    })
  }

  private toPaymentResponse(payment: Payment): PaymentResponse["payment"] {
    return {
      id: payment.id,
      amount: payment.amount.value,
      currency: payment.amount.currency,
      status: payment.status,
      reason: payment.reason,
      createdAt: payment.createdAt.toISOString(),
    }
  }
}
