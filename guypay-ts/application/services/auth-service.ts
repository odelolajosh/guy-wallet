import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { User } from "@/domain/user/model";
import { IUserRepository } from "@/domain/user/repository";
import { IConfiguration } from "@/infrastructure/config/interfaces";
import { EmailAlreadyExistError, InvalidEmailOrPasswordError, InvalidOrExpiredOAuthError, UserNotFoundError } from "../errors/auth-error";
import { OAuthFactory, OAuthProvider } from "@/infrastructure/services/oauth/oauth-factory";

interface AuthToken {
  accessToken: string;
  refreshToken: string;
}

/**
 * Defines the authentication service
 */
export interface IAuthService {
  /**
   * Registers a new user
   * @param email - The user's email
   * @param password - The user's password
   * @returns The newly created user
   */
  register(email: string, password: string): Promise<User>;

  /**
   * Logs in a user
   * @param email - The user's email
   * @param password - The user's password
   * @returns The user
   */
  login(email: string, password: string): Promise<User>;

  /**
   * Generates an access token and a refresh token for a user
   * @param user - The user
   * @returns The auth tokens
   */
  generateTokens(user: User): Promise<AuthToken>;

  /**
   * Checks if an access token is valid
   * @param token - Access token to verify
   * @returns The user if the token is valid, null otherwise
   */
  verifyAccessToken(token: string): Promise<User | null>;

  /**
   * Generates an OAuth URL for a provider
   * @param provider - The OAuth provider
   * @returns The OAuth URL
   */
  generateOAuthURL(provider: OAuthProvider): Promise<string>;

  /**
   * Logs in a user with OAuth
   * @param provider - The OAuth provider
   * @param code - The OAuth code
   * @param state - The OAuth state
   * @returns The user
   */
  loginWithOAuth(provider: OAuthProvider, code: string, state: string): Promise<User>;
}

/**
 * An implementation of IAuthService
 * Should be the only class responsible for handling authentication
 */
export class AuthService implements IAuthService {
  constructor(private configuration: IConfiguration, private userRepository: IUserRepository) { }

  async register(email: string, password: string): Promise<User> {
    const existingUser = await this.userRepository.findByEmail(email);
    if (existingUser) {
      throw new EmailAlreadyExistError()
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User('1', email, hashedPassword);
    await this.userRepository.save(newUser);

    return newUser;
  }

  async login(email: string, password: string): Promise<User> {
    const user = await this.userRepository.findByEmail(email);
    if (!user) {
      throw new InvalidEmailOrPasswordError();
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new InvalidEmailOrPasswordError();
    }

    return user;
  }

  async generateTokens(user: User): Promise<AuthToken> {
    return {
      accessToken: this.generateAccessToken(user.id),
      refreshToken: this.generateRefreshToken(user.id)
    }
  }

  async verifyAccessToken(token: string) {
    const payload = jwt.verify(token, this.configuration.get("JWT_ACCESS_SECRET")) as jwt.JwtPayload
    const userId = payload.sub;
    if (!userId) {
      return null;
    }

    return this.userRepository.findById(userId);
  }

  async generateOAuthURL(providerId: OAuthProvider): Promise<string> {
    const provider = OAuthFactory.create(providerId, this.configuration.getOAuthClientId(providerId));
    return provider.generateURL("guy-pay");
  }

  async loginWithOAuth(providerId: OAuthProvider, code: string, state: string): Promise<User> {
    const provider = OAuthFactory.create(providerId, this.configuration.getOAuthClientId(providerId));
    const { id, email } = await provider.authenticate(code);

    // TODO: Find a better way to verify the state (which should be unique and dynamic)
    if (state !== "guy-pay") {
      throw new InvalidOrExpiredOAuthError();
    }

    let user = await this.userRepository.findByEmail(email);
    if (!user) {
      throw new UserNotFoundError();
    }

    return user;
  }

  private generateAccessToken(userId: string): string {
    return jwt.sign(
      { sub: userId },
      this.configuration.get("JWT_ACCESS_SECRET"),
      {
        algorithm: "HS256",
        expiresIn: this.configuration.get("JWT_ACCESS_EXPIRES")
      }
    );
  }

  private generateRefreshToken(userId: string): string {
    return jwt.sign(
      { sub: userId },
      this.configuration.get("JWT_REFRESH_SECRET"),
      {
        algorithm: "HS256",
        expiresIn: this.configuration.get("JWT_REFRESH_EXPIRES")
      }
    );
  }
}
