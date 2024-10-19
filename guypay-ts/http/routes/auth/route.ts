import { Router } from "express";
import { AuthController } from "./controller";
import { IAuthService } from "@/application/services/auth-service";
import { IUserRepository } from "@/domain/user/repository";

export function authRoutes(authService: IAuthService, userRepository: IUserRepository) {
  const router = Router()
  const controller = new AuthController(authService, userRepository)

  router.post("/login", controller.loginWithEmailAndPassword)
  router.post("/register", controller.loginWithEmailAndPassword)
  router.post("/google", controller.generateGoogleOauthURL)
  router.post("/google/callback", controller.loginWithGoogle)

  return router
}
