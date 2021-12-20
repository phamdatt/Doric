import { ExpoConfig, ConfigContext } from "@expo/config";

type AppEnvType = "development" | "production" | "staging";
const ENV_DEVELOPMENT = "development";
const ENV_PRODUCTION = "production";
const ENV_STAGING = "staging";
const APP_ENV = [ENV_DEVELOPMENT, ENV_PRODUCTION, ENV_STAGING].includes(
  process.env.APP_ENV ?? ""
)
  ? (process.env.APP_ENV as AppEnvType)
  : ENV_PRODUCTION;

// Please increase version before start new build
const APP_VERSION = "1.0.3";
const APP_BUILD_NUMBER = 4;

const DEVELOPMENT_CONFIG = {
  name: "DoricDev",
  slug: "doric-dev",
  ios: {
    buildNumber: APP_BUILD_NUMBER + "",
    requireFullScreen: true,
    bundleIdentifier: "com.doric.ios",
    googleServicesFile:
      "./src/assets/firebase/staging/GoogleService-Info.plist",
  },
  android: {
    versionCode: APP_BUILD_NUMBER,
    package: "com.doric.android",
    googleServicesFile: "./src/assets/firebase/staging/google-services.json",
  },

  sentry: {
    organization: "doric",
    project: "react-native",
  },
  extra: {
    APP_ENV: ENV_DEVELOPMENT,
    API_BASE_URL: "http://172.16.2.138:3000",
    FACABOOK_ID: "857277571520854",
    SENTRY_DSN:
      "https://e0944192002440a393aea9f7295a688c@o1077895.ingest.sentry.io/6081229",
  },
};

const PRODUCTION_CONFIG = {
  name: "Doric",
  slug: "doric-prod",
  ios: {
    buildNumber: APP_BUILD_NUMBER + "",
    requireFullScreen: true,
    bundleIdentifier: "com.doric.ios",
    googleServicesFile:
      "./src/assets/firebase/staging/GoogleService-Info.plist",
  },
  android: {
    versionCode: APP_BUILD_NUMBER,
    package: "com.doric.android",
    googleServicesFile: "./src/assets/firebase/staging/google-services.json",
  },

  sentry: {
    organization: "doric",
    project: "react-native",
  },
  extra: {
    APP_ENV: ENV_PRODUCTION,
    API_BASE_URL: "http://172.16.2.138:3000",
    FACABOOK_ID: "857277571520854",
    SENTRY_DSN:
      "https://e0944192002440a393aea9f7295a688c@o1077895.ingest.sentry.io/6081229",
  },
};

const APP_DEV_CONFIG = {
  [ENV_DEVELOPMENT]: DEVELOPMENT_CONFIG,
  [ENV_PRODUCTION]: PRODUCTION_CONFIG,
};

export default ({ config }: ConfigContext): ExpoConfig => {
  return {
    name: APP_DEV_CONFIG[APP_ENV].name,
    slug: APP_DEV_CONFIG[APP_ENV].slug,
    version: APP_VERSION,
    ios: APP_DEV_CONFIG[APP_ENV].ios,
    android: APP_DEV_CONFIG[APP_ENV].android,
    extra: APP_DEV_CONFIG[APP_ENV].extra,
    orientation: "portrait",
    icon: "./src/assets/icon.png",
    splash: {
      image: "./src/assets/sp.png",
      resizeMode: "contain",
      backgroundColor: "#FFFFFF",
    },
    assetBundlePatterns: ["**/*"],
    androidStatusBar: {
      barStyle: "dark-content",
      backgroundColor: "#fff",
      translucent: false,
    },
    packagerOpts: {
      config: "metro.config.js",
      sourceExts: [
        "expo.ts",
        "expo.tsx",
        "expo.js",
        "expo.jsx",
        "ts",
        "tsx",
        "js",
        "jsx",
        "json",
        "wasm",
        "svg",
        "db",
      ],
    },
    hooks: {
      postPublish: [
        {
          file: "sentry-expo/upload-sourcemaps",
          config: {
            organization: APP_DEV_CONFIG[APP_ENV].sentry.organization,
            project: APP_DEV_CONFIG[APP_ENV].sentry.project,
            authToken:
              "9bd230072cd44c628655748f5c866f4a9a39f11c50e546d5a8ae7facae4c5a01",
          },
        },
      ],
    },
  };
};
