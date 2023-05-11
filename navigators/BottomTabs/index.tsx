import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs'
import MangaList from '@screens/Manga/MangaList'
import Mangalist from '@screens/Home/Latest'
import { Settings } from '@screens/Profile'

const Tab = createMaterialBottomTabNavigator<IRootBottomTabsParams>()

export default function BottomTabs() {
  return (
    <Tab.Navigator shifting>
      <Tab.Screen
        name="Latest"
        component={Mangalist}
        options={{
          tabBarIcon: 'flash'
        }}
      />
      <Tab.Screen
        name="Home"
        component={MangaList}
        options={{
          tabBarIcon: 'home'
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Settings}
        options={{
          tabBarIcon: 'face-man'
        }}
      />
    </Tab.Navigator>
  )
}
