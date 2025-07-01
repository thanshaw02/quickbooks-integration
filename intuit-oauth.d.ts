declare module "intuit-oauth" {
    /** Configuration options for OAuthClient */
    export interface OAuthClientConfig {
        clientId: string;
        clientSecret: string;
        environment: "sandbox" | "production";
        redirectUri: string;
        logging?: boolean;
    }
  
    /** Token structure returned from QuickBooks OAuth */
    export interface Token {
        access_token: string;
        refresh_token: string;
        expires_in: string;
        x_refresh_token_expires_in: string;
        token_type: string;
        id_token?: string;
        realmId?: string;
    }
  
    /** OAuthClient class provided by intuit‑oauth */
    export default class OAuthClient {
        constructor(config: OAuthClientConfig);
    
        /** Predefined scopes for convenience */
        static scopes: {
            Accounting: string;
            OpenId: string;
            // add more if exposed
        };
    
        /** Build the authorization URL for user consent */
        authorizeUri(params: {
            scope: string[]; // required
            state?: string;
            response_type?: "code";
            claims?: any;
        }): string;
    
        /** Exchange the callback URL (with code) for access/refresh tokens */
        createToken(callbackUri: string): Promise<{ token: Token; getJson?: () => Token }>;
    
        /** Refresh the access token using stored refresh token */
        refresh(): Promise<{ token: Token }>;
    
        /** Revoke current access token */
        revoke(): Promise<{ status: string }>;
    
        /** Validate the ID token (OpenID Connect) */
        validateIdToken?(): Promise<boolean>;
    
        /** Get currently loaded token (from client instance) */
        getToken(): Token | null;
    
        /** Set a token object manually on the client */
        setToken?(token: Token): void;
    
        /** Check token validity */
        isAccessTokenValid(): boolean;
        isRefreshTokenValid(): boolean;
    
        /** Optionally get user profile from OpenID */
        getUserInfo?(): Promise<any>;
    }
}
  