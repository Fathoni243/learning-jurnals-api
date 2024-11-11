import dotenv from "dotenv";
import pkg from "../../package.json";
import path from "path";
import { readFileSync } from "fs";
dotenv.config();

export type AppMode = "prod" | "dev";

export interface ConfigProps {
  name: string;
  description: string;
  version: string;
  mode?: AppMode;
  port: number;
  jwt: jwtProps;
  email: EmailProps;
  salt: string;
  gcs: { bucket?: string };
  compro_url: string;
  authExpired: AuthExpired;
}

export interface resourceProps {}

export interface jwtProps {
  keysPath?: string;
  expired?: string;
  refreshExpired?: string;
  privateKey: Buffer;
  publicKey: Buffer;
}

export interface EmailProps {
  host: string;
  port: string;
  user: string;
  password: string;
}

interface AuthExpired {
  otpExpired?: string;
  tokenExpired?: string;
}

const config: ConfigProps = {
  name: pkg.name,
  description: pkg.description,
  version: pkg.version,
  mode: process.env.APP_MODE as AppMode,
  port: parseInt(process.env.APP_PORT ?? "7000"),
  jwt: {
    keysPath: process.env.KEYS_PATH,
    expired: process.env.JWT_EXPIRED_TIME,
    refreshExpired: process.env.JWT_REFRESH_EXPIRED_TIME,
    get privateKey() {
      const privateKeyPath: string = path.join(this.keysPath!, "private.key");
      return readFileSync(privateKeyPath);
    },
    get publicKey() {
      const publicKeyPath: string = path.join(this.keysPath!, "public.key");
      return readFileSync(publicKeyPath);
    },
  },
  email: {
    host: process.env.MAIL_HOST ?? "",
    password: process.env.MAIL_PASSWORD ?? "",
    port: process.env.MAIL_PORT ?? "",
    user: process.env.MAIL_USER ?? "",
  },
  salt: process.env.SALT ?? "",
  gcs: { bucket: process.env.GCS_BUCKET },
  compro_url: process.env.COMPRO_URL ?? "",
  authExpired: {
    otpExpired: process.env.OTP_EXPIRED_TIME,
    tokenExpired: process.env.TOKEN_EXPIRED_TIME,
  },
};

export default config;
