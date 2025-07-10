"use client"

import { GetCompanyInfoQuickBooks } from "@/api/QuickBooksApi";
import { Button } from "@mui/material";

export const QuickBooksTestingButtons = () => {
    const handleGetQuickBooksCompanyInfo = async () => {
        try {
            const account = await GetCompanyInfoQuickBooks();
            console.log("QuickBooks company info: ", account);
        } catch (error) {
            console.error("Error getting QuickBooks company info: ", error);
        }
    };

    return (
        <>
            <Button
                variant="contained"
                // Redirecting user directly to API endpoint so the Next redirect routes user to QuickBooks for authentication
                href="/api/quickbooks/auth"
            >
                Test QuickBooks (Intuit Auth)
            </Button>
            <Button
                variant="contained"
                onClick={handleGetQuickBooksCompanyInfo}
            >
                Test QuickBooks (Get Company Info)
            </Button>
        </>
    )
};
