import { NextRequest, NextResponse } from "next/server";
import { oauthClient } from "@/lib/quickbooksClient";
import { saveToken } from "@/lib/quickbooksTokenStore";

// This can either be here, NextJS server side, or the callback URL can be your API. if the callback URL is API side then you need to
//  handle saving this token so it persists somehow (database, send it to the frontend for localStorage or secureStorage, etc.).
// This redirect URL (the full URL and path) must be saved into your QuickBooks Online app at this location (following these steps):
//  1. Login to your Intuit QuickBooks developer account
//      - https://accounts.intuit.com/app/sign-in?app_group=ExternalDeveloperPortal&asset_alias=Intuit.devx.devx&iux_target_aal=25&iux_sso_mfa=true&redirect_uri=https%3A%2F%2Fdeveloper.intuit.com%2Fapp%2Fdeveloper%2Fhomepage
//  2. Go to your App Dashboard
//      - Click "My Hub" in top right corner after logging in
//      - Click "App Dashboard"
//  3. Click on your app
//  4. Go to: Settings -> Redirect URLs
//  5. Add a new redirect URI, click on "Add URI"
//      - This URI must match whatever endpoint you are handlign the redirectionf or authentication at
//      - In the case of this project my redirect URI is: http://localhost:3000/api/quickbooks/callback
export const GET = async (req: NextRequest) => {
    try {
        console.log(":: GET :: /quickbooks/callback");

        const url = req.url;
        const tokenResponse = await oauthClient.createToken(url);

        saveToken(tokenResponse.token); // Save token in file (only for testing)
        oauthClient.setToken(tokenResponse.token); // Save token to singletone client (doesn't fulyl work in this case, each Next endpoint has its own memory)

        // Here you can either return a token and store it in localStorage or secureStorage *OR* store thsi int he database or some other storage method.
        // Currently I don't want to do anything as I'm saving the token in a non traditional way, as a file, so I'm just keeping the user on this page (home page).
        return NextResponse.redirect(new URL("/", req.url));
    } catch (error) {
        console.error("OAuth callback error:", error);
        return NextResponse.json({ error: "OAuth callback failed" }, { status: 500 });
    }
};
