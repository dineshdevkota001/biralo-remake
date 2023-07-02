import useConfiguration from '@contexts/ConfigurationContext'
import { useMaterial3Theme } from '@pchmn/expo-material3-theme'
import { useMemo } from 'react'
import { useColorScheme } from 'react-native'
import {
  MD3DarkTheme,
  MD3LightTheme,
  adaptNavigationTheme,
  useTheme as useM3Theme
} from 'react-native-paper'
import {
  DarkTheme as NavigationDarkTheme,
  DefaultTheme as NavigationDefaultTheme
} from '@react-navigation/native'
import {
  MD3Colors,
  MD3Theme
} from 'react-native-paper/lib/typescript/src/types'

type IAppTheme = MD3Theme & {
  colors: MD3Colors & {
    success: string
    successContainer: string
    onSuccess: string
    onSuccessContainer: string
  }
}

export function useAppColors() {
  const { config } = useConfiguration()

  const colorScheme = useColorScheme()

  const { theme } = useMaterial3Theme({
    sourceColor: config.themeColor || undefined
  })
  const isDarkMode = (config.colorScheme ?? colorScheme) === 'dark'

  const paperTheme = useMemo(
    () =>
      isDarkMode
        ? {
            ...MD3DarkTheme,
            colors: {
              ...theme.dark,
              success: '#4CAF50',
              successContainer: '#1B5E20',
              onSuccess: '#FFF',
              onSuccessContainer: '#000'
            }
          }
        : {
            ...MD3LightTheme,
            colors: {
              ...theme.light,
              success: '#4CAF50',
              successContainer: '#E8F5E9',
              onSuccess: '#FFF',
              onSuccessContainer: '#000'
            }
          },
    [theme, isDarkMode]
  )

  const { LightTheme, DarkTheme } = adaptNavigationTheme({
    reactNavigationLight: NavigationDefaultTheme,
    reactNavigationDark: NavigationDarkTheme,
    materialDark: paperTheme,
    materialLight: paperTheme
  })

  return {
    paperTheme,
    navigationTheme: isDarkMode ? DarkTheme : LightTheme,
    barStyle: (isDarkMode ? 'light-content' : 'dark-content') as
      | 'light-content'
      | 'dark-content'
  }
}

export default function useTheme() {
  return useM3Theme<IAppTheme>()
}
