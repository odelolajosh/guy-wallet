import { User } from "@/domain/user/model";
import { OAuthProvider } from "@/infrastructure/services/oauth/oauth-factory";

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
   * @param name - The user's name
   * @param email - The user's email
   * @param password - The user's password
   * @returns The newly created user
   */
  register(name: string, email: string, password: string): Promise<User>;

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
  verifyAccessToken(token: string): Promise<User>;

  /**
   * Generates an access token
   * @param userId - The user's ID
   * @returns The access token
   */
  refreshAccessToken(refreshToken: string): Promise<string>

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
 * Defines the interface for the OAuth2 service.
 */
export interface IOAuth2Service {
  /**
   * Generates a URL for the user to authenticate with.
   * @param state - The state to pass to the OAuth2 service
   * @returns The URL
   */
  generateURL(state: string): string;

  /**
   * Authenticates the user and returns the user's email.
   * @param code - The code from the OAuth2 service
   * @returns The user's payload
   */
  authenticate(code: string): Promise<{ id: string, email: string }>;
}