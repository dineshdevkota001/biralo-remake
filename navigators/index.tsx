import { getHeaderTitle } from '@react-navigation/elements'
import Gallery from '@screens/Common/Gallery'
import ChapterList from '@screens/Manga/MangaFeed'
import { getTitle } from '@utils/getLocalizedString'
import { Appbar } from 'react-native-paper'
import {
  BOTTOM_TABS,
  CHAPTERS,
  GALLERY,
  PROFILE,
  WEBVIEW
} from '@constants/static/screens'
import Profile from '@screens/Profile/Settings'
import {
  NativeStackHeaderProps,
  createNativeStackNavigator
} from '@react-navigation/native-stack'
import WebViewScreen from '@screens/Common/Webview'
import BottomTabs from './BottomTabs'

export function MaterialYouHeader({
  options,
  route,
  navigation,
  back
}: NativeStackHeaderProps) {
  const title = getHeaderTitle(options, route.name)
  return (
    <Appbar.Header>
      {back ? <Appbar.BackAction onPress={navigation.goBack} /> : null}
      <Appbar.Content title={title} />
    </Appbar.Header>
  )
}

const Stack = createNativeStackNavigator<IRootStackParams>()

export default function Navigation() {
  return (
    <Stack.Navigator
      screenOptions={{
        header: MaterialYouHeader
      }}
    >
      <Stack.Screen
        name={BOTTOM_TABS}
        component={BottomTabs}
        options={{
          headerShown: false
        }}
      />
      <Stack.Screen
        name={CHAPTERS}
        component={ChapterList}
        options={({ route }) => ({
          title: getTitle(route.params.manga.attributes.title)
        })}
      />
      <Stack.Screen
        name={GALLERY}
        component={Gallery}
        options={{
          headerShown: false
        }}
      />
      <Stack.Screen
        name={WEBVIEW}
        component={WebViewScreen}
        options={{
          headerShown: false
        }}
      />
      <Stack.Screen name={PROFILE} component={Profile} />
    </Stack.Navigator>
  )
}
