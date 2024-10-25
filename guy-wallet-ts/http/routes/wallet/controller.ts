import { routeHandler } from "@/http/lib/route-handler";
import { Request, Response } from "@/http/types/http";
import { CreateWalletDto, CreateWalletResponseDTO, GetWalletByIdDto, GetWalletByIdResponseDTO, WalletResponseDTO } from "./dto";
import { IWalletService } from "@/application/wallet/interfaces";
import { Wallet } from "@/domain/wallet/model";

export class WalletController {
  constructor(private walletService: IWalletService) {
    this.createWallet = this.createWallet.bind(this);
    this.getWalletById = this.getWalletById.bind(this);
  }

  @routeHandler
  async createWallet(request: Request<CreateWalletDto>, response: Response<CreateWalletResponseDTO>) {
    const { currency } = request.body;
    const user = request.user!;

    const wallet = await this.walletService.createWallet(user.id, currency);
    response.status(201).json({
      wallet: this.toWalletResponse(wallet)
    });
  }

  @routeHandler
  async getWalletById(request: Request<{}, {}, GetWalletByIdDto>, response: Response<GetWalletByIdResponseDTO>) {
    const { walletId } = request.params;
    const wallet = await this.walletService.getWalletById(walletId);

    response.status(200).json({
      wallet: this.toWalletResponse(wallet)
    });
  }

  private toWalletResponse(wallet: Wallet): WalletResponseDTO {
    return {
      id: wallet.id,
      status: wallet.status,
      balance: wallet.balance.amount,
      currency: wallet.balance.currency,
      createdAt: new Date(wallet.createdAt).toISOString()
    };
  }
}
