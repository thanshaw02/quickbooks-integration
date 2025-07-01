"use client"

export const ClientFetchHelper = async(
    url: string,
    options: RequestInit = {},
): Promise<any> => {
    try {
        const response = await fetch(`/api${url}`, {
            ...options,
            headers: {
                ...options.headers,
            },
        });

        if (response.status === 401) {
            // This code will be seen if we throw an "Unauthorized" error in the "AuthorizedFetchJsonObject" calls in our next server routes
            throw new Error("Unauthorized");
        }

        if (!response.ok) {
            throw new Error(
                `CLIENT: Failed to fetch ${url}: ${response.status} ${response.statusText}`,
            );
        }

        return await response.json();
    } catch (error: any) {
        throw error;
    }
};
