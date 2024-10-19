
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