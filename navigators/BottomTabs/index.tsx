import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs'
import MangaList from '@screens/Manga/MangaList'
import RecentChapters from '@screens/Home/Latest'
import UserFeedScreen from '@screens/User/Feed'
import { SEARCH } from '@constants/static/screens'

const Tab = createMaterialBottomTabNavigator<IRootBottomTabsParams>()

export default function BottomTabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Latest"
        component={RecentChapters}
        options={{
          tabBarIcon: 'flash'
        }}
      />
      <Tab.Screen
        name={SEARCH}
        component={MangaList}
        options={{
          tabBarIcon: 'feature-search-outline'
        }}
      />
      <Tab.Screen
        name="Feed"
        component={UserFeedScreen}
        options={{
          tabBarIcon: 'newspaper-variant'
        }}
      />
    </Tab.Navigator>
  )
}
