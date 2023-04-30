import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs'
import Home from '@screens/Home/Home'
import Mangalist from '@screens/Home/Latest'

const Tab = createMaterialBottomTabNavigator<IRootBottomTabsParams>()

export default function BottomTabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarIcon: 'home'
        }}
      />
      <Tab.Screen
        name="Latest"
        component={Mangalist}
        options={{
          tabBarIcon: 'flash'
        }}
      />
    </Tab.Navigator>
  )
}
