"use client"

import { AuthenticateQuickBooks } from "@/api/QuickBooksApi";
import { Button } from "@mui/material";

export const QuickBooksAuthButton = () => {
    const handleQuickBooksPress = async () => {
        try {
            const response = await AuthenticateQuickBooks();
            console.log("QuickBooks authentication response: ", response);
        } catch (error) {
            console.error("Ereror authentication with QuickBooks: ", error);
        }
    };

    return (
        <>
            <Button
                variant="contained"
                href="/api/quickbooks/auth"
                // onClick={handleQuickBooksPress}
            >
                Test QuickBooks (Intuit)
            </Button>
        </>
    )
};
