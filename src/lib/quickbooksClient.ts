import OAuthClient from "intuit-oauth";

export const oauthClient = new OAuthClient({
  clientId: process.env.QB_CLIENT_ID!,
  clientSecret: process.env.QB_CLIENT_SECRET!,
  environment: "sandbox", // or "production"
  redirectUri: process.env.QB_REDIRECT_URI! // e.g. "http://localhost:3000/api/quickbooks/callback"
});
