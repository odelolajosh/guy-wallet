import { Router } from "express";
import { requireBody } from "@/http/middlewares/validation";
import { requireAuth } from "@/http/middlewares/auth";
import { IAuthService } from "@/application/auth/auth-interface";
import { PaymentController } from "./controller";
import { IPaymentService } from "@/application/payment/payment-interface";
import { initializeTransferSchema } from "./dto";
import { IQueue } from "@/application/queue/queue-interface";
import { Payment } from "@/domain/payment/model";
import { IWalletService } from "@/application/wallet/wallet-interface";

export function paymentRoutes(
  authService: IAuthService,
  walletService: IWalletService,
  paymentService: IPaymentService,
  paymentProcessingQueue: IQueue<Payment>,
  paymentFinalizationQueue: IQueue<Payment>
) {
  const router = Router()
  const controller = new PaymentController(walletService, paymentService, paymentProcessingQueue, paymentFinalizationQueue)

  router.get("/", requireAuth(authService), controller.getPayments)
  router.get("/:walletId", requireAuth(authService), controller.getWalletPayments)
  router.post("/:walletId/transfer", requireAuth(authService), requireBody(initializeTransferSchema), controller.initializeTransfer)

  // Webhook for guy payment provider
  router.post("/provider/guy", controller.guyHandler)

  return router
}