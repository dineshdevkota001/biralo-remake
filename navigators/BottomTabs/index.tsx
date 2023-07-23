import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs'
import MangaList from '@screens/BottomTab/MangaList'
import RecentChapters from '@screens/BottomTab/Latest'
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
    </Tab.Navigator>
  )
}
