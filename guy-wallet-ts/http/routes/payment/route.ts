import { Router } from "express";
import { requireBody } from "@/http/middlewares/validation";
import { requireAuth } from "@/http/middlewares/auth";
import { IAuthService } from "@/application/auth/auth-interface";
import { PaymentController } from "./controller";
import { IPaymentService } from "@/application/payment/payment-interface";
import { initializeTransferSchema } from "./dto";

export function paymentRoutes(authService: IAuthService, paymentService: IPaymentService) {
  const router = Router()
  const controller = new PaymentController(paymentService)

  router.get("/:walletId", requireAuth(authService), controller.getPayments)
  router.post("/:walletId/transfer", requireAuth(authService), requireBody(initializeTransferSchema), controller.initializeTransfer)

  // Webhook for guy payment provider
  router.post("/provider/guy", requireAuth(authService), controller.guyHandler)

  return router
}