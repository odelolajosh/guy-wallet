import { Router } from "express";
import { AuthController } from "./controller";
import { IAuthService } from "@/application/auth/interfaces";
import { requireBody, requireQuery } from "@/http/middlewares/validation";
import { loginRequestSchema, oauthRequestQuerySchema, registerRequestSchema } from "./dto";
import { requireAuth } from "@/http/middlewares/auth";

export function authRoutes(authService: IAuthService) {
  const router = Router()
  const controller = new AuthController(authService)

  router.get("/me", requireAuth(authService), controller.getMe)
  router.post("/login", requireBody(loginRequestSchema), controller.loginWithEmailAndPassword)
  router.post("/register", requireBody(registerRequestSchema), controller.registerWithEmailAndPassword)
  router.post("/google", controller.generateGoogleOAuthURL)
  router.post("/google/callback", requireQuery(oauthRequestQuerySchema), controller.loginWithGoogle)

  return router
}
