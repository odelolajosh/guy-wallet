import { routeHandler } from "@/http/lib/route-handler"
import { Request, Response } from "@/http/types/http"
import { GuyWebhookRequestDto, InitializeTransferDTO, PaymentResponse, PaymentsResponse, WalletParamsDto } from "./dto"
import { Payment, PaymentParty, PaymentStatus, PaymentType } from "@/domain/payment/payment"
import { Currency, Money } from "@/domain/common/money"
import { IPaymentService } from "@/application/payment/payment-interface"
import { IQueue } from "@/application/queue/queue-interface"
import { IWalletService } from "@/application/wallet/wallet-interface"
import { AlreadyFinalizedPaymentError, InvalidPaymentError, InvalidPaymentPartyError } from "@/application/payment/payment-error"
import { InsufficientBalanceError } from "@/application/wallet/wallet-error"

export class PaymentController {
  constructor(
    private walletService: IWalletService,
    private paymentService: IPaymentService,
    private paymentProcessingQueue: IQueue<Payment>,
    private paymentFinalizationQueue: IQueue<Payment>
  ) {
    this.getPayments = this.getPayments.bind(this)
    this.getWalletPayments = this.getWalletPayments.bind(this)
    this.initializeTransfer = this.initializeTransfer.bind(this)
    this.guyHandler = this.guyHandler.bind(this)
  }

  @routeHandler
  async getPayments(request: Request, response: Response<PaymentsResponse>) {
    const { id } = request.user!

    const payments = await this.paymentService.getPaymentByUserId(id)
    response.json({
      payments: payments.map(this.toPaymentResponse)
    })
  }

  @routeHandler
  async getWalletPayments(request: Request<{}, {}, WalletParamsDto>, response: Response<PaymentsResponse>) {
    const { walletId } = request.params

    const payments = await this.paymentService.getPaymentsByWalletId(walletId)
    response.json({
      payments: payments.map(this.toPaymentResponse)
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

    const wallet = await this.walletService.getWalletById(walletId)
    if (wallet.balance.lessThan(amount)) {
      throw new InsufficientBalanceError()
    }
    
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
      if (wallet.balance.currencyCode !== transfer.currency) {
        // We can't process this transfer because the currency is not supported
        throw new InvalidPaymentError()
      }
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
      amount: payment.amount.toString(),
      currency: payment.amount.currency,
      status: payment.status,
      reason: payment.reason,
      to: {
        type: payment.to.type,
        walletId: payment.to.walletId,
        accountNumber: payment.to.accountNumber,
        bankName: payment.to.bankName,
        accountName: payment.to.accountName
      },
      from: {
        type: payment.from.type,
        walletId: payment.from.walletId,
        accountNumber: payment.from.accountNumber,
        bankName: payment.from.bankName,
        accountName: payment.from.accountName
      },
      createdAt: payment.createdAt.toISOString()
    }
  }
}
