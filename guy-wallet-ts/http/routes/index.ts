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
import { PaymentProcessor } from "@/application/payment/payment-processor"
import { BullQueueWorker } from "@/infrastructure/queue/bullmq/bull-queue-worker"

export function createRoutes() {
  const router = Router()
 
  const configuration = new EnvConfiguration()

  const sqlClient = new PostgresClient(configuration)

  const userRepository = new SqlUserRepository(sqlClient)
  const walletRepository = new SqlWalletRepository(sqlClient)
  const paymentRepository = new SqlPaymentRepository(sqlClient)

  const paymentProvider = new GuyPaymentProvider()

  const paymentQueue = new BullQueue("payment")
  const paymentProcessor = new PaymentProcessor()
  const paymentWorker = new BullQueueWorker("payment", paymentProcessor)

  const authService = new AuthService(configuration, userRepository)
  const walletService = new WalletService(paymentRepository, walletRepository, paymentProvider, paymentQueue)

  router.use("/auth", authRoutes(authService))
  router.use("/wallet", walletRoutes(walletService))

  paymentWorker.start()

  return router
}
