import { IAuthService } from "@/application/services/auth-service";
import { IUserRepository } from "@/domain/user/repository";
import { LoginRequestDto, LoginResponseDto, OAuthRequestParams } from "./dto";
import { Request, Response } from "../../types/http";

export class AuthController {
  constructor(private authService: IAuthService, private userRepository: IUserRepository) { }

  /**
   * Get the current user
   */
  async getMe(request: Request, response: Response) {
    const user = request.user
    if (!user) {
      return response.status(404).json({ message: "User not found" })
    }

    response.status(200).json({
      id: user.id,
      email: user.email,
      createdAt: user.createdAt
    })
  }

  /**
   * Login with email and password
   */
  async loginWithEmailAndPassword(request: Request<LoginRequestDto>, response: Response<LoginResponseDto>) {
    const { email, password } = request.body

    const user = await this.authService.login(email, password)
    const tokens = await this.authService.generateTokens(user)

    response.status(200).json({
      accessToken: tokens.accessToken,
      refreshToken: tokens.refreshToken,
    })
  }

  /**
   * Register with email and password
   */
  async registerWithEmailAndPassword(request: Request<LoginRequestDto>, response: Response<LoginResponseDto>) {
    const { email, password } = request.body

    const user = await this.authService.register(email, password)
    const tokens = await this.authService.generateTokens(user)

    response.status(201).json({
      accessToken: tokens.accessToken,
      refreshToken: tokens.refreshToken,
    })
  }

  /**
   * Generate URL for Google OAuth
   */
  async generateGoogleOauthURL(request: Request, response: Response) {
    const url = this.authService.generateOAuthURL('google')
    response.status(200).json({ url })
  }

  /**
   * Login with Google OAuth
   */
  async loginWithGoogle(request: Request<{}, OAuthRequestParams>, response: Response<LoginResponseDto>) {
    const { code, state } = request.query

    const user = await this.authService.loginWithOAuth('google', code, state)
    const tokens = await this.authService.generateTokens(user)
    response.status(200).json(tokens)
  }
}
