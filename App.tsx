import Navigation from "./navigators";
import { FontAwesome } from "@expo/vector-icons";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import { useMaterial3Theme } from "@pchmn/expo-material3-theme";
import QueryProvider from "@utils/react-query";
import { useFonts } from "expo-font";
import SplashScreen from "expo-splash-screen";
import { NativeBaseProvider } from "native-base";
import { useEffect, useMemo } from "react";
import { useColorScheme } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import {
  MD3DarkTheme,
  MD3LightTheme,
  Provider as PaperProvider,
} from "react-native-paper";
import { SafeAreaProvider } from "react-native-safe-area-context";

export default function App() {
  const [loaded] = useFonts({
    ...FontAwesome.font,
  });

  useEffect(() => {
    if (loaded) SplashScreen?.hideAsync();
    else SplashScreen?.preventAutoHideAsync();
  }, [loaded]);

  const colorScheme = useColorScheme();
  const { theme } = useMaterial3Theme();

  const paperTheme = useMemo(
    () =>
      colorScheme === "dark"
        ? { ...MD3DarkTheme, colors: theme.dark }
        : { ...MD3LightTheme, colors: theme.light },
    [colorScheme, theme],
  );

  return (
    <SafeAreaProvider>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <PaperProvider theme={paperTheme}>
          <NativeBaseProvider>
            <QueryProvider>
              <BottomSheetModalProvider>
                <Navigation />
              </BottomSheetModalProvider>
            </QueryProvider>
          </NativeBaseProvider>
        </PaperProvider>
      </GestureHandlerRootView>
    </SafeAreaProvider>
  );
}
