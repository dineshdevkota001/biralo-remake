import Navigation from "./navigators";
import { FontAwesome } from "@expo/vector-icons";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import QueryProvider from "@utils/react-query";
import { useFonts } from "expo-font";
import SplashScreen from "expo-splash-screen";
import { NativeBaseProvider } from "native-base";
import { useEffect } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Provider as PaperProvider } from "react-native-paper";
import { SafeAreaProvider } from "react-native-safe-area-context";

export default function App() {
  const [loaded] = useFonts({
    ...FontAwesome.font,
  });

  useEffect(() => {
    if (loaded) SplashScreen?.hideAsync();
    else SplashScreen?.preventAutoHideAsync();
  }, [loaded]);

  return (
    <SafeAreaProvider>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <PaperProvider>
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
