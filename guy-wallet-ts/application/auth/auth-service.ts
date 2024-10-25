import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { User } from "@/domain/user/model";
import { IUserRepository } from "@/domain/user/repository";
import { IConfiguration } from "@/infrastructure/config/interfaces";
import { EmailAlreadyExistError, InvalidEmailOrPasswordError, InvalidOrExpiredOAuthError, UserNotFoundError } from "./auth-error";
import { OAuthFactory, OAuthProvider } from "@/infrastructure/services/oauth/oauth-factory";
import { IAuthService } from "./interfaces";

/**
 * An implementation of IAuthService
 * Should be the only class responsible for handling authentication
 */
export class AuthService implements IAuthService {
  constructor(private configuration: IConfiguration, private userRepository: IUserRepository) { }

  async register(name: string, email: string, password: string): Promise<User> {
    const existingUser = await this.userRepository.findByEmail(email);
    if (existingUser) {
      throw new EmailAlreadyExistError()
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User('1', name, email, hashedPassword);
    newUser.id = await this.userRepository.create(newUser);

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

  async generateTokens(user: User) {
    return {
      accessToken: this.generateAccessToken(user.id),
      refreshToken: this.generateRefreshToken(user.id)
    }
  }

  async verifyAccessToken(token: string) {
    try {
      const payload = jwt.verify(token, this.configuration.get("JWT_ACCESS_SECRET")) as jwt.JwtPayload
      const userId = payload.sub;
      if (!userId) {
        return null;
      }

      return this.userRepository.findById(userId);
    } catch (error) {
      return null;
    }
  }

  async generateOAuthURL(providerId: OAuthProvider): Promise<string> {
    const provider = OAuthFactory.create(providerId, this.configuration);
    return provider.generateURL("guy-pay");
  }

  async loginWithOAuth(providerId: OAuthProvider, code: string, state: string): Promise<User> {
    const provider = OAuthFactory.create(providerId, this.configuration);
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
