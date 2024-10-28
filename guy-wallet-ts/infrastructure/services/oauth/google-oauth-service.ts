import { OAuth2Client } from "google-auth-library";
import { IOAuth2Service } from "@/application/auth/auth-interface";

export class GoogleOAuthService implements IOAuth2Service {
  private readonly oauthClient: OAuth2Client;

  constructor(clientId: string) {
    this.oauthClient = new OAuth2Client(clientId);
  }

  generateURL(state: string): string {
    const scopes = ["https://www.googleapis.com/auth/userinfo.email"];
    return this.oauthClient.generateAuthUrl({
      access_type: "offline",
      scope: scopes,
      state
    });
  }

  async authenticate(code: string) {
    const ticket = await this.oauthClient.verifyIdToken({
      idToken: code
    });

    const payload = ticket.getPayload();
    if (!payload) {
      throw new Error("Invalid payload");
    }
    
    const { sub: id, email } = payload;
    if (!id || !email) {
      throw new Error("Invalid payload");
    }

    return { id, email };
  }
}
