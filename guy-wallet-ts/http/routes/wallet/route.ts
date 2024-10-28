import { IWalletService } from "@/application/wallet/wallet-interface";
import { Router } from "express";
import { WalletController } from "./controller";

export function walletRoutes(walletService: IWalletService) {
  const router = Router()
  const controller = new WalletController(walletService)

  router.post("/", controller.createWallet)
  router.get("/:walletId", controller.getWalletById)

  return router
}