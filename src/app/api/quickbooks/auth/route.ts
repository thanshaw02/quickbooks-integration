import { NextRequest, NextResponse } from "next/server";
import { oauthClient } from "@/lib/quickbooksClient";

export const GET = async (req: NextRequest) => {
    try {
        console.log(":: GET :: /quickbooks/auth");
        
        const url = oauthClient.authorizeUri({
          scope: ["com.intuit.quickbooks.accounting"],
          state: "testState",
        });
      
        return NextResponse.redirect(url);
    } catch (error) {
        console.error("OAuth auth error:", error);
        return NextResponse.json({ error: "OAuth auth failed" }, { status: 500 });
    }
};
