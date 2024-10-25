import { IOAuth2Service } from "@/application/auth/interfaces";
import { GoogleOAuthService } from "./google-oauth-service";
import { IConfiguration } from "@/infrastructure/config/interfaces";

export type OAuthProvider = 'google';

export class OAuthFactory {
  static create(providerId: OAuthProvider, configuration: IConfiguration): IOAuth2Service {
    switch (providerId) {
      case "google":
        return new GoogleOAuthService(configuration.get("GOOGLE_CLIENT_ID"));
      default:
        throw new Error(`Unsupported OAuth provider: ${providerId}`);
    }
  }
}