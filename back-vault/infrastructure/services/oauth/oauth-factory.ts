import { IOAuth2Service } from "@/application/interfaces";
import { GoogleOAuthService } from "./google-oauth-service";

export type OAuthProvider = 'google';

export class OAuthFactory {
  static create(providerId: OAuthProvider, clientId: string): IOAuth2Service {
    switch (providerId) {
      case 'google':
        return new GoogleOAuthService(clientId);
      default:
        throw new Error(`Unsupported OAuth provider: ${providerId}`);
    }
  }
}