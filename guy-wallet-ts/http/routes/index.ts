import { Router } from "express"
import { AuthService } from "@/application/auth/auth-service"
import { EnvConfiguration } from "@/infrastructure/config/env"
import { authRoutes } from "./auth/route"
import { SqlUserRepository } from "@/infrastructure/database/sql/repository/sql-user-repository"
import { PostgresClient } from "@/infrastructure/database/sql/postgres"
import { walletRoutes } from "./wallet/route"
import { SqlWalletRepository } from "@/infrastructure/database/sql/repository/sql-wallet-repository"
import { WalletService } from "@/application/wallet/wallet-service"
import { GuyPaymentProvider } from "@/infrastructure/services/payment/guy-payment-provider"
import { SqlPaymentRepository } from "@/infrastructure/database/sql/repository/sql-payment-repository"
import { BullQueue } from "@/infrastructure/queue/bullmq/bull-queue"
import { PaymentFinalizer, PaymentProcessor } from "@/application/payment/payment-processor"
import { BullQueueWorker } from "@/infrastructure/queue/bullmq/bull-queue-worker"
import { GuyPaymentService } from "@/infrastructure/services/payment/guy-payment-service"
import { paymentRoutes } from "./payment/route"
import { PaymentService } from "@/application/payment/payment-service"

export function createRoutes() {
  const router = Router()
 
  const configuration = new EnvConfiguration()

  const sqlClient = new PostgresClient(configuration)

  const userRepository = new SqlUserRepository(sqlClient)
  const walletRepository = new SqlWalletRepository(sqlClient)
  const paymentRepository = new SqlPaymentRepository(sqlClient)

  const paymentProviderService = new GuyPaymentService(configuration);
  const paymentProvider = new GuyPaymentProvider(configuration)

  const paymentProcessingQueue = new BullQueue("payment-processor")
  const paymentFinalizationQueue = new BullQueue("payment-finalizer")

  const paymentProcessor = new PaymentProcessor(paymentProvider, paymentRepository)
  const paymentFinalizer = new PaymentFinalizer(walletRepository, paymentRepository)

  const paymentProcessingWorker = new BullQueueWorker("payment-processor", paymentProcessor)
  const paymentFinalizationWorker = new BullQueueWorker("payment-finalizer", paymentFinalizer)


  const authService = new AuthService(configuration, userRepository)
  const walletService = new WalletService(walletRepository, paymentProvider)
  const paymentService = new PaymentService(paymentRepository)

  router.use("/auth", authRoutes(authService))
  router.use("/wallet", walletRoutes(authService, walletService))
  router.use("/payment", paymentRoutes(authService, walletService, paymentService, paymentProcessingQueue, paymentFinalizationQueue))

  paymentProviderService.start()

  paymentProcessingWorker.start()
  paymentFinalizationWorker.start()

  return router
}
