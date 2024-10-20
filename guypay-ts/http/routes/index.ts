import { Router } from "express"
import { AuthService } from "@/application/services/auth-service"
import { EnvConfiguration } from "@/infrastructure/config/env"
import { TestUserRepository } from "@/tests/mocks/user-repository"
import { authRoutes } from "./auth/route"

export function createRoutes() {
  const router = Router()

  const configuration = new EnvConfiguration()

  // TODO: TestUserRepository is a mock
  const userRepository = new TestUserRepository()
  const authService = new AuthService(configuration, userRepository)

  router.use("/auth", authRoutes(authService))

  return router
}
