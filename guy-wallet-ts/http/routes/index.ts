import { Router } from "express"
import { AuthService } from "@/application/services/auth-service"
import { EnvConfiguration } from "@/infrastructure/config/env"
import { authRoutes } from "./auth/route"
import { SqlUserRepository } from "@/infrastructure/database/sql/repository/SqlUserRepository"
import { PostgresClient } from "@/infrastructure/database/sql/postgres"

export function createRoutes() {
  const router = Router()

  const configuration = new EnvConfiguration()

  const sqlClient = new PostgresClient(configuration)
  const userRepository = new SqlUserRepository(sqlClient)

  const authService = new AuthService(configuration, userRepository)

  router.use("/auth", authRoutes(authService))

  return router
}
