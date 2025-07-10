import { NextRequest, NextResponse } from "next/server";
import { oauthClient } from "@/lib/quickbooksClient";

// Note: If you are using a dedicated API you can either follow this pattern here (handle QuickBooks authentication in the NextJS server side) or
//       move this to your dedicated API and pass back the redirect URL to the frontend with whatever required variables that are needed and
//       redirect the user once your API has responded.
//       The user who is logging into QuickBooks for their company *must* be redirected to QuickBooks using your desginated Redirect URL.
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const GET = async (req: NextRequest) => {
    try {
        // combine space delimited environment variable of scopes, turn into array of strings
        const scopes = process.env.QB_AUTH_SCOPES?.split(/[ ,]+/) || [];
        if (!scopes || !scopes.length) {
            throw new Error("Missing QuickBook authentication scopes");
        }
        
        const url = oauthClient.authorizeUri({
          scope: scopes,
          state: "testState",
        });
      
        // This *must* redirect the user away from the application to authenticate via QuickBooks Online
        return NextResponse.redirect(url);
    } catch (error) {
        console.error("OAuth auth error:", error);
        return NextResponse.json({ error: "OAuth auth failed" }, { status: 500 });
    }
};
