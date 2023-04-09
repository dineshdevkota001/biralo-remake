import { FontAwesome } from '@expo/vector-icons'
import { useFonts } from 'expo-font'
import { NativeBaseProvider } from 'native-base'
import SplashScreen from 'expo-splash-screen'
import { useEffect } from 'react'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import QueryProvider from '@utils/react-query'
import Navigation from './navigators'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet"

export default function App() {
  const [loaded] = useFonts({
    ...FontAwesome.font
  })

  useEffect(() => {
    if (loaded) SplashScreen?.hideAsync()
    else SplashScreen?.preventAutoHideAsync()
  }, [loaded])

  return (
    <SafeAreaProvider>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <NativeBaseProvider>
          <QueryProvider>
            <BottomSheetModalProvider>
              <Navigation />
            </BottomSheetModalProvider>
          </QueryProvider>
        </NativeBaseProvider>
      </GestureHandlerRootView>
    </SafeAreaProvider>
  )
}
