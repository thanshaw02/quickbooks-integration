import fs from "fs";
import { Token } from "intuit-oauth";
import path from "path";

const tokenFile = path.join(process.cwd(), ".quickbooks-token.json");

// Saves token to file system (do not do this in a real application integration)
export const saveToken = (token: Token) => {
  fs.writeFileSync(tokenFile, JSON.stringify(token, null, 2));
};

// Fetches token file and parses it for later use (not needed exactly when doing a real integration, this comes from either the DB,
// local/secure sotrage, or some other persistant storage route).
export const getToken = (): Token | null => {
  if (!fs.existsSync(tokenFile)) return null;
  const raw = fs.readFileSync(tokenFile, "utf-8");
  return JSON.parse(raw);
};
