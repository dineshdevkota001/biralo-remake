import { FontAwesome } from '@expo/vector-icons'
import { useFonts } from 'expo-font'
import { NativeBaseProvider, useColorModeValue, useTheme } from 'native-base'
import SplashScreen from 'expo-splash-screen'
import { useEffect } from 'react'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import QueryProvider from '@utils/react-query'
import { ThemeProvider } from '@react-navigation/native'
import Navigation from './navigators'

export default function App() {
  const [loaded] = useFonts({
    ...FontAwesome.font
  })

  useEffect(() => {
    if (loaded) SplashScreen?.hideAsync()
    else SplashScreen?.preventAutoHideAsync()
  }, [loaded])

  return (
    <QueryProvider>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <NativeBaseProvider>
          <Navigation />
        </NativeBaseProvider>
      </GestureHandlerRootView>
    </QueryProvider>
  )
}
