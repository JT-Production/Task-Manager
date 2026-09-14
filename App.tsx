import { NavigationContainer, DefaultTheme } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import MainAppStack from "./src/navigation/MainAppStack";
import { useFonts } from "expo-font";
import { AppColors } from "./src/utils/colors";
import { Provider } from "react-redux";
import { store } from "./store/store";
import { useEffect, useState } from "react";
import SplashhScreen from "./src/screens/onboarding/SplashhScreen";
import * as SplashScreen from "expo-splash-screen";
SplashScreen.preventAutoHideAsync().catch(() => {});
const AppTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: "white",
    primary: AppColors.primary,
  },
};

export default function App() {
  const [fontsLoaded] = useFonts({
    "Inter-Medium": require("./assets/fonts/InterDisplay-Medium.ttf"),
    "Inter-Bold": require("./assets/fonts/InterDisplay-Bold.ttf"),
  });

  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    async function prepare() {
      if (!fontsLoaded) return;

      // Hide Expo native splash
      await SplashScreen.hideAsync();
    }

    prepare();
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  if (showSplash) {
    return (
      <Provider store={store}>
        <NavigationContainer theme={AppTheme}>
          <SplashhScreen onFinish={() => setShowSplash(false)} />
        </NavigationContainer>
      </Provider>
    );
  }

  return (
    <Provider store={store}>
      <NavigationContainer theme={AppTheme}>
        <MainAppStack />
      </NavigationContainer>
    </Provider>
  );
}
