# Custom Typescript type definitions and how to use them

### How to use the type definitions for `intuit-oauth` in your project:

- Copy the `intuit-oauth.d.ts` file from this project into the root diretory of your own Typescript project
- Install the `intuit-oauth` library with this npm command: `npm i intuit-oauth`
- The `intuit-oauth` library will now automatically be typed and you will have intelisense in VSCode (and type checking)

You can find my custom `intuit-oauth` types at the root level directory under `intuit-oauth.d.ts`

### How to use the type definitions for `node-quickbooks` in your project:

I stopped development on fully defining types for the `node-quickbooks` SDK for now as it is very large, if you want to define this SDK's types feel free to do so or partially type the SDK with just the methods you need to use

You can find my custom `node-quickbooks` types at the root level directory under `node-quickbooks.d.ts`

# Usage in a real world application

A single user will connect their company in the application to QuickBooks (clicking some button called `Integrate QuickBooks`). They will be prompted to authenticate (redirected back to QuickBooks website to login). Then QuickBooks will send you back to the application with a JSON object that has an `refresh_token` and an `access_token`.

Store both the `refresh_token` and `access_token` in the database (encrypt the refresh token!). Then whenever you decide to refresh the `access_token` you will do so (this can be during each API call you make to the QuickBooks API or just periodically, QuickBooks will send you a new `access_token` and will update the refresh time on your previous `refresh_token`. Now you can update the old `access_token` in the database with the new `access_token` (and possibly the old `refresh_token` and/or the `refresh_tokens` expiration time, this property is called `x_refresh_token_expires_in`) in the database with the new `access_token`.

# Summary

A small reposityory for testing out integrating QuickBooks into a project using Typescript. This includes custom Typescript types for the `intuit-oauth` library and will possibly include custom Typescript types for the `node-quickbooks` library (however the QuickBooks library is very large so this may be time consuming).

The two large blue buttons on the home page are the QuickBooks integration testing buttons, you must authentication with QuickBooks (click the first button titled _Test QuickBooks (Intuit Auth)_ before you can fully test the QuickBooks SDK integration (clicking the second button titled _Test QuickBooks (Get Company Info)_)

## Setup

Create a `.env` file and copy/paste this into it:

```
NODE_ENV="development"

QB_CLIENT_ID="<QUICKBOOKS_ONLINE_APP_CLIENT_ID>"
QB_CLIENT_SECRET="<QUICKBOOKS_ONLINE_APP_CLIENT_SECRET>"

# This is what this application is configured for (assuming you add this Redirect URL into your QuickBooks Online app)
# See "/src/app/api/quickbooks/callback/route.ts" for notes on hwo to add a new Redirect URL to your app for authentication
QB_REDIRECT_URI="http://localhost:3000/api/quickbooks/callback"

# This scope covers most services we'll need from QuickBooks
# To pass an array of scopes into here add then to the end of the string and separate each scope with a space
# Other scopes include:
#   - com.intuit.quickbooks.payment
#   - openid
QB_AUTH_SCOPES="com.intuit.quickbooks.accounting"
```

[See the comments in this file on how to add new _Redirect URLs_ for your local testing and other environment testing](https://github.com/thanshaw02/quickbooks-integration/blob/main/src/app/api/quickbooks/callback/route.ts#L5-L17)

## Running in production mode

Build app for production: `npm run build`
<br>
Run app in production mode: `npm run start`

## Running in development mode

Run app in development mode: `npm run dev`

## References

- QuickBooks javascript SDK: https://www.npmjs.com/package/node-quickbooks
- (QuickBooks) Intuit OAuth library: https://www.npmjs.com/package/intuit-oauth
