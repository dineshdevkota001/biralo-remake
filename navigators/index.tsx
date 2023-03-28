import { useColorModeValue, useTheme } from 'native-base'
import { ThemeProvider } from '@react-navigation/native'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import BottomTabs from './BottomTabs'
import ChapterList from '@screens/Home/ChapterDetails'
import { createSharedElementStackNavigator } from 'react-navigation-shared-element'
import Gallery from '@screens/Common/Gallery'

const Stack = createSharedElementStackNavigator<IRootStackParams>()

function RootNavigation() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Bottom Tabs"
        component={BottomTabs}
        options={{
          headerShown: false
        }}
      />
      <Stack.Screen
        name="Chapter List"
        component={ChapterList}
        sharedElements={route => {
          const { id } = route.params
          return [`${id}.cover`]
        }}
      />
      <Stack.Screen
        name="Gallery"
        component={Gallery}
        options={{
          presentation: 'modal',
          headerShown: false
        }}
      />
    </Stack.Navigator>
  )
}

export default function Navigation() {
  const { colors } = useTheme()
  const theme = useColorModeValue(
    {
      dark: false,
      colors: {
        primary: colors.primary[500],
        background: colors.gray[100],
        card: colors.white,
        text: colors.text[800],
        border: colors.gray[200],
        notification: colors.red[700]
      }
    },
    {
      dark: true,
      colors: {
        primary: colors.primary[500],
        background: colors.gray[900],
        card: colors.black,
        text: colors.gray[100],
        border: colors.gray[700],
        notification: colors.red[700]
      }
    }
  )

  return (
    <ThemeProvider value={theme}>
      <NavigationContainer>
        <RootNavigation />
      </NavigationContainer>
    </ThemeProvider>
  )
}
