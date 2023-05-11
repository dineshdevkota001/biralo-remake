import useConfiguration, {
  ConfigurationProvider
} from '@contexts/ConfigurationContext'
import { FontAwesome } from '@expo/vector-icons'
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet'
import { useMaterial3Theme } from '@pchmn/expo-material3-theme'
import QueryProvider from '@utils/react-query'
import { useFonts } from 'expo-font'
import SplashScreen from 'expo-splash-screen'
import { useEffect, useMemo } from 'react'
import { useColorScheme, StatusBar } from 'react-native'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import {
  MD3DarkTheme,
  MD3LightTheme,
  Provider as PaperProvider,
  adaptNavigationTheme
} from 'react-native-paper'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import {
  DarkTheme as NavigationDarkTheme,
  DefaultTheme as NavigationDefaultTheme,
  NavigationContainer
} from '@react-navigation/native'
import Navigation from './navigators'

function App() {
  const [loaded] = useFonts({
    ...FontAwesome.font
  })
  const { config } = useConfiguration()

  useEffect(() => {
    if (loaded) SplashScreen?.hideAsync()
    else SplashScreen?.preventAutoHideAsync()
  }, [loaded])

  const colorScheme = useColorScheme()

  const { theme } = useMaterial3Theme({
    sourceColor: config.themeColor || undefined
  })
  const isDarkMode = (config.colorScheme ?? colorScheme) === 'dark'

  const paperTheme = useMemo(
    () =>
      isDarkMode
        ? { ...MD3DarkTheme, colors: theme.dark }
        : { ...MD3LightTheme, colors: theme.light },
    [theme, isDarkMode]
  )

  const { LightTheme, DarkTheme } = adaptNavigationTheme({
    reactNavigationLight: NavigationDefaultTheme,
    reactNavigationDark: NavigationDarkTheme,
    materialDark: paperTheme,
    materialLight: paperTheme
  })

  return (
    <PaperProvider theme={paperTheme}>
      <QueryProvider>
        <BottomSheetModalProvider>
          <NavigationContainer theme={isDarkMode ? DarkTheme : LightTheme}>
            <StatusBar
              barStyle={isDarkMode ? 'light-content' : 'dark-content'}
            />
            <Navigation />
          </NavigationContainer>
        </BottomSheetModalProvider>
      </QueryProvider>
    </PaperProvider>
  )
}

export default function Wrapper() {
  return (
    <ConfigurationProvider>
      <SafeAreaProvider>
        <GestureHandlerRootView style={{ flex: 1 }}>
          <App />
        </GestureHandlerRootView>
      </SafeAreaProvider>
    </ConfigurationProvider>
  )
}
