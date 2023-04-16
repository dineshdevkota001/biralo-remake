import Icon from "@components/Core/Icon";
import {
  BottomTabHeaderProps,
  createBottomTabNavigator,
} from "@react-navigation/bottom-tabs";
import { getHeaderTitle } from "@react-navigation/elements";
import { useTheme } from "@react-navigation/native";
import Home from "@screens/Home/Home";
import Profile from "@screens/Profile";
import { Appbar } from "react-native-paper";

function TabBarIcon(props: {
  name: React.ComponentProps<typeof Icon>["name"];
  color: string;
}) {
  return <Icon size={28} style={{ marginBottom: -3 }} {...props} />;
}

export function MaterialYouHeader({ options, route }: BottomTabHeaderProps) {
  const title = getHeaderTitle(options, route.name);
  return (
    <Appbar.Header>
      <Appbar.Content title={title} />
    </Appbar.Header>
  );
}

const Tab = createBottomTabNavigator<IRootBottomTabsParams>();

export default function BottomTabs() {
  const theme = useTheme();
  console.log(theme);
  return (
    <Tab.Navigator
      screenOptions={{
        header: MaterialYouHeader,
      }}
    >
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarIcon: ({ color }) => <TabBarIcon name="home" color={color} />,
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarIcon: ({ color }) => (
            <TabBarIcon name="face-man" color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
