import { IAuthService } from "@/application/services/auth-service";
import { LoginRequestDto, LoginResponseDto, OAuthRequestQuery } from "./dto";
import { Request, Response } from "../../types/http";
import { routeHandler } from "@/http/lib/route-handler";

export class AuthController {
  constructor(private authService: IAuthService) {
    this.getMe = this.getMe.bind(this)
    this.loginWithEmailAndPassword = this.loginWithEmailAndPassword.bind(this)
    this.registerWithEmailAndPassword = this.registerWithEmailAndPassword.bind(this)
    this.generateGoogleOAuthURL = this.generateGoogleOAuthURL.bind(this)
    this.loginWithGoogle = this.loginWithGoogle.bind(this)
  }

  /**
   * Get the current user
   */
  @routeHandler
  async getMe(request: Request, response: Response) {
    const user = request.user
    if (!user) {
      response.status(404).json({ message: "User not found" })
      return
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
  @routeHandler
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
  @routeHandler
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
  async generateGoogleOAuthURL(request: Request, response: Response) {
    const url = await this.authService.generateOAuthURL('google')
    response.status(200).json({ url })
  }

  /**
   * Login with Google OAuth
   */
  async loginWithGoogle(request: Request<{}, OAuthRequestQuery>, response: Response<LoginResponseDto>) {
    const { code, state } = request.query

    const user = await this.authService.loginWithOAuth('google', code, state)
    const tokens = await this.authService.generateTokens(user)
    response.status(200).json(tokens)
  }
}
