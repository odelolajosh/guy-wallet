import { Router } from "express"
import { AuthService } from "@/application/auth/auth-service"
import { EnvConfiguration } from "@/infrastructure/config/env"
import { authRoutes } from "./auth/route"
import { SqlUserRepository } from "@/infrastructure/database/sql/repository/SqlUserRepository"
import { PostgresClient } from "@/infrastructure/database/sql/postgres"
import { WalletService } from "@/application/wallet/wallet-service"
import { walletRoutes } from "./wallet/route"
import { SqlWalletRepository } from "@/infrastructure/database/sql/repository/SqlWalletRepository"

export function createRoutes() {
  const router = Router()

  const configuration = new EnvConfiguration()

  const sqlClient = new PostgresClient(configuration)

  const userRepository = new SqlUserRepository(sqlClient)
  const walletRepository = new SqlWalletRepository(sqlClient)

  const authService = new AuthService(configuration, userRepository)
  const walletService = new WalletService(walletRepository)

  router.use("/auth", authRoutes(authService))
  router.use("/wallet", walletRoutes(walletService))

  return router
}
