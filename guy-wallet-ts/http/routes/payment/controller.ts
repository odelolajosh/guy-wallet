import { routeHandler } from "@/http/lib/route-handler"
import { Request, Response } from "@/http/types/http"
import { GuyWebhookRequestDto, InitializeTransferDTO, PaymentResponse, WalletParamsDto } from "./dto"
import { Payment, PaymentParty, PaymentStatus, PaymentType } from "@/domain/payment/model"
import { Money } from "@/domain/common/money"
import { IPaymentService } from "@/application/payment/payment-interface"

export class PaymentController {
  constructor(private paymentService: IPaymentService) { }

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

    const to = destination.type === "wallet" ?
      new PaymentParty("wallet", destination.walletId) :
      new PaymentParty("bank", destination.bankName, destination.accountNumber, destination.accountName)

    const amount = new Money(request.body.currency, request.body.amount)

    const payment = await this.paymentService.initializeTransfer(walletId, to, PaymentType.Transfer, amount)

    response.status(200).json({
      payment: this.toPaymentResponse(payment)
    })
  }

  @routeHandler
  async guyHandler(request: Request<GuyWebhookRequestDto>, response: Response) {
    const { transfer } = request.body

    if (transfer.reference) {
      await this.paymentService.finalizePayment(transfer.reference, transfer.status === "success" ? PaymentStatus.Completed : PaymentStatus.Failed)
      response.status(200).end()
    } else if (transfer.receiverAccountNumber) {
      const to = new PaymentParty("bank", transfer.receiverBankName, transfer.receiverAccountNumber, transfer.receiverAccountName)
    }
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
