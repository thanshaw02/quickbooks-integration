import fs from "fs";
import path from "path";

const tokenFile = path.join(process.cwd(), ".quickbooks-token.json");

export const saveToken = (token: any) => {
  fs.writeFileSync(tokenFile, JSON.stringify(token, null, 2));
};

export const getToken = (): any | null => {
  if (!fs.existsSync(tokenFile)) return null;
  const raw = fs.readFileSync(tokenFile, "utf-8");
  return JSON.parse(raw);
};
