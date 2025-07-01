declare module "node-quickbooks" {
    export interface QuickBooksClientConfig {
      consumerKey: string;
      consumerSecret: string;
      oauthToken: string;
      tokenSecret: boolean;
      realmId: string;
      useSandbox: boolean;
      enableDebugging: boolean;
      minorVersion: string | null;
      oauthVersion: string;
      refreshToken: string;
    }
  
    export default class QuickBooks {
      constructor(
        consumerKey: string,
        consumerSecret: string,
        oauthToken: string,
        tokenSecret: string,
        realmId: string,
        useSandbox: boolean,
        enableDebugging: boolean,
        minorVersion: string | null,
        oauthVersion: string,
        refreshToken: string
      );
  
      // Example API methods — node-quickbooks uses callbacks
      findCustomers(callback: (err: Error | null, customers: any) => void): void;
  
      query(query: string, callback: (err: Error | null, result: any) => void): void;
  
      createCustomer(customer: object, callback: (err: Error | null, result: any) => void): void;
  
      updateCustomer(customer: object, callback: (err: Error | null, result: any) => void): void;
  
      deleteCustomer(id: string, callback: (err: Error | null, result: any) => void): void;
  
      getCustomer(id: string, callback: (err: Error | null, result: any) => void): void;
  
      // You can add more methods similarly if you're using them
    }
  }
  