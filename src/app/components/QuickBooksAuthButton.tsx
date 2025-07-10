"use client"

import { GetCompanyInfoQuickBooks } from "@/api/QuickBooksApi";
import { Alert, Button, Snackbar } from "@mui/material";
import { useState } from "react";
import { ErrorCode } from "../dto/ErrorCodes";

export const QuickBooksTestingButtons = () => {
    const [reAuth, setReAuth] = useState<boolean>(false);

    const onSnackbarClose = () => setReAuth(false);

    const handleGetQuickBooksCompanyInfo = async () => {
        try {
            const account = await GetCompanyInfoQuickBooks();
            console.log("QuickBooks company info: ", account);
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
            console.error("Error getting QuickBooks company info: ", error.message);
            if (error.message === ErrorCode.QB_REAUTH_REQUIRED){
                setReAuth(true);
            }
        }
    };

    return (
        <>
            <Snackbar
                anchorOrigin={{ vertical: "top", horizontal: "center" }}
                open={reAuth}
                onClose={onSnackbarClose}
            >
                <Alert
                    onClose={onSnackbarClose}
                    severity="error"
                    variant="filled"
                    sx={{ width: "100%" }}
                >
                    Your QuickBooks session has expired, please login again
                </Alert>
            </Snackbar>

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
