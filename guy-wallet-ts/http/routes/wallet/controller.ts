import { routeHandler } from "@/http/lib/route-handler"
import { Request, Response } from "@/http/types/http"
import { CreateWalletDto, CreateWalletResponseDTO, WalletParamsDto, GetWalletByIdResponseDTO, InitializeTransferRequestDTO, WalletResponseDTO } from "./dto"
import { IWalletService } from "@/application/wallet/wallet-interface"
import { Wallet } from "@/domain/wallet/model"
import { PaymentParty, PaymentType } from "@/domain/payment/model"
import { Money } from "@/domain/common/money"

export class WalletController {
  constructor(private walletService: IWalletService) {
    this.createWallet = this.createWallet.bind(this)
    this.getWalletById = this.getWalletById.bind(this)
  }

  @routeHandler
  async createWallet(request: Request<CreateWalletDto>, response: Response<CreateWalletResponseDTO>) {
    const { currency } = request.body
    const user = request.user!

    const wallet = await this.walletService.createWallet(user.id, currency)
    response.status(201).json({
      wallet: this.toWalletResponse(wallet)
    })
  }

  @routeHandler
  async getWalletById(request: Request<{}, {}, WalletParamsDto>, response: Response<GetWalletByIdResponseDTO>) {
    const { walletId } = request.params
    const wallet = await this.walletService.getWalletById(walletId)

    response.status(200).json({
      wallet: this.toWalletResponse(wallet)
    })
  }

  @routeHandler
  async initializeTransfer(request: Request<InitializeTransferRequestDTO, {}, WalletParamsDto>, response: Response) {
    const { walletId } = request.params
    const { destinationType } = request.body

    let to: PaymentParty;

    if (destinationType == "wallet") {
      to = {
        type: "wallet",
        walletId: request.body.walletId
      }
    } else {
      to = {
        type: "bank",
        accountNumber: request.body.accountNumber,
        bankName: request.body.bankName
      }
    }

    const amount = new Money(request.body.currency, request.body.amount)
    await this.walletService.initializePayment(walletId, to, PaymentType.Debit, amount)

    response.status(200).json({ message: "Payment initialized" })
  }

  private toWalletResponse(wallet: Wallet): WalletResponseDTO {
    return {
      id: wallet.id,
      status: wallet.status,
      balance: wallet.balance.value,
      currency: wallet.balance.currency,
      createdAt: new Date(wallet.createdAt).toISOString()
    };
  }
}
