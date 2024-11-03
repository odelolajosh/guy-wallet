import { routeHandler } from "@/http/lib/route-handler"
import { Request, Response } from "@/http/types/http"
import { CreateWalletDto, CreateWalletResponseDTO, WalletParamsDto, GetWalletByIdResponseDTO, WalletResponseDTO, GetWalletsResponseDTO } from "./dto"
import { IWalletService } from "@/application/wallet/wallet-interface"
import { Wallet } from "@/domain/wallet/model"

export class WalletController {
  constructor(private walletService: IWalletService) {
    this.createWallet = this.createWallet.bind(this)
    this.getWalletById = this.getWalletById.bind(this)
    this.getWallets = this.getWallets.bind(this)
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
  async getWallets(request: Request, response: Response<GetWalletsResponseDTO>) {
    const user = request.user!
    const wallets = await this.walletService.getWalletsByUserId(user.id)

    response.status(200).json({
      wallets: wallets.map(this.toWalletResponse)
    })
  }

  private toWalletResponse(wallet: Wallet): WalletResponseDTO {
    return {
      id: wallet.id,
      status: wallet.status,
      balance: wallet.balance.value,
      currency: wallet.balance.currency,
      accountNumber: wallet.accountNumber,
      bankName: wallet.bankName,
      createdAt: new Date(wallet.createdAt).toISOString()
    };
  }
}
