import { IWalletService } from "@/application/wallet/wallet-interface";
import { Router } from "express";
import { WalletController } from "./controller";
import { requireBody } from "@/http/middlewares/validation";
import { createWalletSchema } from "./dto";
import { requireAuth } from "@/http/middlewares/auth";
import { IAuthService } from "@/application/auth/auth-interface";

export function walletRoutes(authService: IAuthService, walletService: IWalletService) {
  const router = Router()
  const controller = new WalletController(walletService)

  router.post("/", requireAuth(authService), requireBody(createWalletSchema), controller.createWallet)
  router.get("/", requireAuth(authService), controller.getWallets)
  router.get("/:walletId", requireAuth(authService), controller.getWalletById)

  return router
}
