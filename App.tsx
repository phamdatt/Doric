import "react-native-gesture-handler";
import React, { useState } from "react";
import AppLoading from "expo-app-loading";
import { assetFonts } from "./asset";
import { cacheFonts, cacheImages } from "./src/helper/assetCachingHelper";
import RootNavigation from "./src/navigation/RootNavigator";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { NativeBaseProvider } from "native-base";
import { assetImages } from "./src/config";
import * as Font from "expo-font";
import * as Sentry from "sentry-expo";
import { SENTRY_DSN } from "@/config/app";
import store from "@/redux/index";
import { Provider } from "react-redux";

export default function App() {
  const [isReady, setIsReady] = useState(false);
  const startApp = async () => {
    const fontCacheAssets = cacheFonts(assetFonts);
    const imageCacheAssets = cacheImages(Object.values(assetImages));
    await Promise.all<any>([fontCacheAssets, ...imageCacheAssets]);
  };
  // console.warn(Font.isLoaded('FadoFontItalic'));
  Sentry.init({
    dsn: SENTRY_DSN,
    enableInExpoDevelopment: true,
    debug: true, // If `true`, Sentry will try to print out useful debugging information if something goes wrong with sending the event. Set it to `false` in production
  });

  if (!isReady) {
    return (
      <AppLoading
        startAsync={startApp}
        onFinish={() => setIsReady(true)}
        onError={console.warn}
      />
    );
  }
  return (
    <Provider store={store}>
      <NativeBaseProvider>
        <SafeAreaProvider>
          <RootNavigation></RootNavigation>
        </SafeAreaProvider>
      </NativeBaseProvider>
    </Provider>
  );
}
