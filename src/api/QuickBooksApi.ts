"use client"

import { CompanyInfo } from "@/app/dto/CompanyInfo";
import { ClientFetchHelper } from "@/helpers/ClientFetchHelper";

// Not needed as we must route the user directly to this API page so the user is properly redirected to QuickBooks for authentication
// Keeping for historical reasons
export const AuthenticateQuickBooks = async () => {
    return ClientFetchHelper("quickbooks/auth");
};

export const GetCompanyInfoQuickBooks = async (): Promise<CompanyInfo> => {
    return ClientFetchHelper("quickbooks/get-company-info");
};
