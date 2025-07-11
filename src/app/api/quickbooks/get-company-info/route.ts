/* eslint-disable @typescript-eslint/no-explicit-any */

import { NextRequest, NextResponse } from "next/server";
import { oauthClient } from "@/lib/quickbooksClient";
import { getToken, saveToken } from "@/lib/quickbooksTokenStore";
import { CompanyInfo } from "@/app/dto/CompanyInfo";
import { ErrorCode } from "@/app/dto/ErrorCodes";
// eslint-disable-next-line @typescript-eslint/no-require-imports
const QuickBooks = require("node-quickbooks"); // ESLint will be mad due to this type of import

// In NestJS we would create a new module for QuickBooks that has a public "client" variable that can be used in the class/service methods.

// Note: Here we are not using any custom Typescript types I created for the node-quickbooks client. Although we are still using the
//       custom Typescript types for the official QuickBooks authentication library "intuit-auth" as that library is very small compared to "node-quickbooks".
//       We can easily build out custom Typescript types for the "node-quickbooks" SDK however to do a full typing of the SDK, this would take a long time
//       due to the size of the SDK. So I opted to just use the SDK as intended, with Javascript.
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const GET = async (req: NextRequest) => {
    try {
        // Fetch the saved token from the ".quickbooks-token.json" file and set it in our OAuth client
        // Do not save the token in this way when actually integrating QuickBooks Online
        // Note: Even though I'm using a singleton pattern each endpoint does not share the same memory,
        //       so I need to re-set the token from the file we generated everytime we make a QuickBooks call.
        const token = getToken();
        if (!token) {
            console.error("No QuickBooks token found");
            return NextResponse.json({ error: "Unauthorized: QuickBooks token is not valid", code: ErrorCode.QB_NOAUTH }, { status: 401 });
        }
        oauthClient.setToken(token);

        const isAccesstokenValid = oauthClient.isAccessTokenValid();
        if (!isAccesstokenValid) {
            // If the "access_token" is invalid (has expired) then we will attempt to refresh the "access_token"
            // This will:
            //      1. Get a fresh "access_token"
            //      2. Reset the "access_token"'s expiration time for one hour from now
            //      3. Reset the "refresh_token" expiration time from 100 days from now
            // Note: If the QuickBooks integration is not used for over 100 days in a row ("access_token" is never refreshed) then you will need
            //       to re-authenticate again using the "/api/quickbooks/auth" endpoint with "intuit-oauth".
            try {
                console.log("QuickBooks token is not valid, refreshing tokens");
                const { token } = await oauthClient.refresh();
                saveToken(token); // Save token in file (only for testing)
                oauthClient.setToken(token); // Save token to singletone client (doesn't fulyl work in this case, each Next endpoint has its own memory)
            } catch (error: any) {
                // Likely error here is if we attmept to refresh the "access_token" when our "refresh_token" is invalid
                // The user must re-authenticate in this case
                console.error("QuickBooks token refreshed failed: ", error);
                return NextResponse.json({ error: "QuickBooks refresh token expired", code: ErrorCode.QB_REAUTH_REQUIRED }, { status: 401 });
            }
        }

        const client = new QuickBooks(
            process.env.QB_CLIENT_ID!,
            process.env.QB_CLIENT_SECRET!,
            oauthClient.token.access_token,
            false, // no token secret for oAuth 2.0
            oauthClient.token.realmId,
            true,  // use the sandbox
            false,  // enable debugging
            null,  // set minorversion, or null for the latest version
            "2.0", // oAuth version
            oauthClient.token.refresh_token,
        );

        // The "node-quickbooks" does not support promises, they only use callbacks
        // So, to stick with the usage of promises (keepign id modern, as little callbacks as possible) I'm turn the entire SDK call into a promise below.
        const companyInfo = await new Promise((resolve, reject) => {
            client.getCompanyInfo(client.realmId, (error: any, companyInfo: CompanyInfo) => {
                if (error) {
                    console.error("Error fetching QuickBooks company info: ", error);
                    return reject(error);
                }

                // console.log("\nCompany information:");
                // console.dir(companyInfo, { depth: null });
                // console.log("\n");
                resolve(companyInfo);
            });
        });

        return NextResponse.json({ companyInfo });
    } catch (error) {
        console.error("QuickBooks 'getCompanyInfo' error:", error);
        return NextResponse.json({ error: "QuickBooks 'getCompanyInfo' failed" }, { status: 500 });
    }
};
