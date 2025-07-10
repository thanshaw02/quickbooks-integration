"use client"

export const ClientFetchHelper = async(
    url: string,
    options: RequestInit = {},
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
): Promise<any> => {
    try {
        const response = await fetch(`/api/${url}`, {
            ...options,
            headers: {
                ...options.headers,
            },
        });

        if (response.status === 401) {
            const errorCode = (await response.json()).code;
            throw new Error(errorCode || "Unauthorized");
        }

        if (!response.ok) {
            throw new Error(
                `CLIENT: Failed to fetch ${url}: ${response.status} ${response.statusText}`,
            );
        }

        return await response.json();
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
        throw error;
    }
};
