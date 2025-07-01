import { NextRequest, NextResponse } from "next/server";
import { oauthClient } from "@/lib/quickbooksClient";
import { saveToken } from "@/lib/quickbooksTokenStore";

export const GET = async (req: NextRequest) => {
    try {
        console.log(":: GET :: /quickbooks/callback");

        const url = req.url;
        const tokenResponse = await oauthClient.createToken(url);

        saveToken(tokenResponse.token);

        return NextResponse.redirect(new URL("/", req.url));
    } catch (error) {
        console.error("OAuth callback error:", error);
        return NextResponse.json({ error: "OAuth callback failed" }, { status: 500 });
    }
};
