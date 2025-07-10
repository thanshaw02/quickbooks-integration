export type Address = {
    Id: string;
    Line1: string;
    City: string;
    CountrySubDivisionCode: string;
    PostalCode: string;
    Lat: string;
    Long: string;
};

export type Email = {
    Address: string;
};

export type NameValue = {
    Name: string;
    Value: string;
};

export type MetaData = {
    CreateTime: string;      // these are dates in string format
    LastUpdatedTime: string; // these are dates in string format
};

// This matches the response from the "node-quickbooks" SDK call "getCompanyInfo"
// Two properties are not present, "PrimaryPhone" and "WebAddr", because they are not set in my test app, not sure what these data structures look like
export type CompanyInfo = {
    Id: string;
    CompanyName: string;
    LegalName: string;
    CompanyAddr: Address
    CustomerCommunicationAddr: Address;
    LegalAddr: Address;
    CustomerCommunicationEmailAddr: Email;
    CompanyStartDate: string;
    FiscalYearStartMonth: string;
    Country: string;
    Email: Email;
    SupportedLanguages: string;
    DefaultTimeZone: string;
    NameValue: NameValue[];
    domain: string;
    sparse: boolean;
    SyncToken: string;
    MetaData: MetaData;
};
