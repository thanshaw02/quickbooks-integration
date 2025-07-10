// Note: Started to build out type definitions for the "node-quickbooks" SDK, however this is a large SDK so I ended up stopping and opted
//       to use the Javascript version as-is.
//       What we can do, if you want strict type safety and intelisense, uncomment this file and build out the type definitions for *only*
//       the properties, constructors, and methods that you aim to use (no need to do a full type definition file for the dozens of functions).

// declare module "node-quickbooks" {
//     export interface QuickBooksClientConfig {
//       consumerKey: string;
//       consumerSecret: string;
//       oauthToken: string;
//       tokenSecret: boolean;
//       realmId: string;
//       useSandbox: boolean;
//       enableDebugging: boolean;
//       minorVersion: string | null;
//       oauthVersion: string;
//       refreshToken: string;
//     }

//     export interface AccountType {
//         Bank: "Bank";
//         OtherCurrentAsset: "Other Current Asset";
//         FixedAsset: "Fixed Asset";
//         OtherAsset: "Other Asset";
//         AccountsReceivable: "Accounts Receivable";
//         // many more, see docus: https://developer.intuit.com/app/developer/qbo/docs/api/accounting/all-entities/account
//     }

//     export interface CreateAccountDto {
//         Name: string;
//         AccountType?: AccountType;
//         AcctNum?: string;
//         AccountSubType?: string;
//     }

//     export interface Account {
//         FullyQualifiedName: string;
//         domain: string;
//         Name: string;
//         Classification: string;
//         AccountSubType: string;
//         CurrencyRef: {
//             name: string;
//             value: string;
//         };
//         CurrentBalanceWithSubAccounts: number;
//         sparse: boolean;
//         MetaData: {
//             CreateTime: string;
//             LastUpdatedTime: string;
//         };
//         AccountType: string;
//         CurrentBalance: number;
//         Active: boolean;
//         SyncToken: string;
//         Id: string;
//         SubAccount: boolean;
//     }
  
//     export default class QuickBooks {
//       constructor(
//         consumerKey: string,
//         consumerSecret: string,
//         oauthToken: string,
//         tokenSecret: string,
//         realmId: string,
//         useSandbox: boolean,
//         enableDebugging: boolean,
//         minorVersion: string | null,
//         oauthVersion: string,
//         refreshToken: string
//       );

//       createAccount(account: CreateAccountDto, callback: (error: Error, account: Account) => void): void;
  
//       // Example API methods — node-quickbooks uses callbacks
//     //   findCustomers(callback: (err: Error | null, customers: any) => void): void;
  
//     //   query(query: string, callback: (err: Error | null, result: any) => void): void;
  
//     //   createCustomer(customer: object, callback: (err: Error | null, result: any) => void): void;
  
//     //   updateCustomer(customer: object, callback: (err: Error | null, result: any) => void): void;
  
//     //   deleteCustomer(id: string, callback: (err: Error | null, result: any) => void): void;
  
//     //   getCustomer(id: string, callback: (err: Error | null, result: any) => void): void;
  
//       // You can add more methods similarly if you're using them
//     }
//   }
  