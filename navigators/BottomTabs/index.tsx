import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs'
import MangaList from '@screens/Manga/MangaList'
import Mangalist from '@screens/Home/Latest'
import { Settings } from '@screens/Profile'
import useAuth from '@contexts/AuthContext'
import LoginScreen from '@screens/Auth/LoginPage'
import UserFeedScreen from '@screens/User/Feed'

const Tab = createMaterialBottomTabNavigator<IRootBottomTabsParams>()

export default function BottomTabs() {
  const { isAuthenticated } = useAuth()

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
        name="Feed"
        component={UserFeedScreen}
        options={{
          tabBarIcon: 'newspaper-variant'
        }}
      />
      <Tab.Screen
        name="Profile"
        component={isAuthenticated ? Settings : LoginScreen}
        options={{
          tabBarIcon: 'face-man'
        }}
      />
    </Tab.Navigator>
  )
}
