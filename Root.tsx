import {
  AppConfigurationProvider,
  MangadexConfigurationProvider
} from '@contexts/ConfigurationContext'
import { FontAwesome } from '@expo/vector-icons'
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet'
import QueryProvider from '@utils/react-query'
import { useFonts } from 'expo-font'
import SplashScreen from 'expo-splash-screen'
import { useEffect } from 'react'
import { StatusBar } from 'react-native'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { Provider as PaperProvider } from 'react-native-paper'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { NavigationContainer } from '@react-navigation/native'
import { AuthProvider } from '@contexts/AuthContext'
import { useAppColors } from 'styles/appStyle'
import Navigation from './navigators'

function App() {
  const [loaded] = useFonts({
    ...FontAwesome.font
  })
  const { paperTheme, barStyle, navigationTheme } = useAppColors()

  useEffect(() => {
    if (loaded) SplashScreen?.hideAsync()
    else SplashScreen?.preventAutoHideAsync()
  }, [loaded])

  return (
    <PaperProvider theme={paperTheme}>
      <QueryProvider>
        <MangadexConfigurationProvider>
          <BottomSheetModalProvider>
            <NavigationContainer theme={navigationTheme}>
              <StatusBar barStyle={barStyle} />
              <Navigation />
            </NavigationContainer>
          </BottomSheetModalProvider>
        </MangadexConfigurationProvider>
      </QueryProvider>
    </PaperProvider>
  )
}

export default function Wrapper() {
  return (
    <AuthProvider>
      <AppConfigurationProvider>
        <SafeAreaProvider>
          <GestureHandlerRootView style={{ flex: 1 }}>
            <App />
          </GestureHandlerRootView>
        </SafeAreaProvider>
      </AppConfigurationProvider>
    </AuthProvider>
  )
}
