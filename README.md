# Summary

A small reposityory for testing out integrating QuickBooks into a project using Typescript. This includes custom Typescript types for the `intuit-oauth` library and will possibly include custom Typescript types for the `node-quickbooks` library (however the QuickBooks library is very large so this may be time consuming).

The two large blue buttons on the home page are the QuickBooks integration testing buttons, you must authentication with QuickBooks (click the first button titled _Test QuickBooks (Intuit Auth)_ before you can fully test the QuickBooks SDK integration (clicking the second button titled _Test QuickBooks (Get Company Info)_)

# Custom Typescript Types

You can find my custom `intuit-oauth` types at the root level directory under `intuit-oauth.d.ts`

You can find my custom `node-quickbooks` types at the root level directory under `node-quickbooks.d.ts`

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

## Running in production mode

Build app for production: `npm run build`
<br>
Run app in production mode: `npm run start`

## Running in development mode

Run app in development mode: `npm run dev`
