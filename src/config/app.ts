import Constants from "expo-constants";

const extraEnv: any = Constants.manifest?.extra ?? {};

type AppEnvType = "development" | "production";
export const ENV_DEVELOPEMENT = "development";
export const ENV_PRODUCTION = "production";
export const APP_ENV: AppEnvType = extraEnv.APP_ENV;
export const SENTRY_DSN : string = extraEnv.SENTRY_DSN ?? '';