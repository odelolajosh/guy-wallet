import { Router } from "express";
import { AuthController } from "./controller";
import { IAuthService } from "@/application/services/auth-service";
import { requireBody, requireQuery } from "@/http/middlewares/validation";
import { loginRequestDto, oauthRequestQuery } from "./dto";
import { requireAuth } from "@/http/middlewares/auth";

export function authRoutes(authService: IAuthService) {
  const router = Router()
  const controller = new AuthController(authService)

  router.get("/me", requireAuth(authService), controller.getMe)
  router.post("/login", requireBody(loginRequestDto), controller.loginWithEmailAndPassword)
  router.post("/register", requireBody(loginRequestDto), controller.registerWithEmailAndPassword)
  router.post("/google", controller.generateGoogleOAuthURL)
  router.post("/google/callback", requireQuery(oauthRequestQuery), controller.loginWithGoogle)

  return router
}
