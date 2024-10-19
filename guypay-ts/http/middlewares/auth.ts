import { IAuthService } from "@/application/services/auth-service"
import { NextFunction, Request, Response } from "express"

/**
 * Middleware to require a valid access token
 * @param authService {IAuthService}
 */
export const requireAuth = (authService: IAuthService) => (
  async (request: Request, response: Response, next: NextFunction) => {
    const authorization = request.headers["authorization"]

    if (!authorization) {
      response.status(401).json({ message: "Authorization header missing." })
      return
    }

    const [strategy, token] = authorization.split(" ")
    if (strategy !== "Bearer" || !token) {
      response.status(401).json({ message: "Invalid authorization format. Token missing." })
      return
    }

    const user = await authService.verifyAccessToken(token)
    if (!user) {
      response.status(403).json({ message: "Invalid or expired token" });
      return
    }

    request.user = user;
    next()
  }
)
