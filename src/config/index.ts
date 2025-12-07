import dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.join(process.cwd(), ".env") });

if (!process.env.CONNECTION_STRING) {
  throw new Error("CONNECTION_STRING is not defined in .env");
}
if (!process.env.JWT_SECRET) {
  throw new Error("JWT_SECRET is not defined in .env");
}

const config = {
  connection_string: process.env.CONNECTION_STRING,
  port: Number(process.env.PORT) || 5000,
  JWT_SECRET: process.env.JWT_SECRET as string,
  JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN ?? "7d",
};

export default config;
export type Config = typeof config;
