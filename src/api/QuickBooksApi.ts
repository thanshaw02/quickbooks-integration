"use client"

import { ClientFetchHelper } from "@/helpers/ClientFetchHelper";

export const AuthenticateQuickBooks = async () => {
    return ClientFetchHelper("/quickbooks/auth");
};
