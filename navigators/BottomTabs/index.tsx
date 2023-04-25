import Icon from "@components/Core/Icon";
import {
  BottomTabHeaderProps,
  createBottomTabNavigator,
} from "@react-navigation/bottom-tabs";
import { getHeaderTitle } from "@react-navigation/elements";
import Login from "@screens/Auth";
import Home from "@screens/Home/Home";
import { Appbar, useTheme } from "react-native-paper";

function TabBarIcon({
  focused,
  ...props
}: {
  name: React.ComponentProps<typeof Icon>["name"];
  color: string;
  focused?: boolean;
}) {
  const { colors } = useTheme();
  return (
    <Icon
      selectable
      size={24}
      style={[
        { marginBottom: -3 },
        focused
          ? {
              backgroundColor: colors.primaryContainer,
              paddingHorizontal: 12,
              paddingVertical: 4,
              borderRadius: 14,
              overflow: "hidden",
            }
          : {},
      ]}
      {...props}
    />
  );
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
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon focused={focused} name="home" color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Login"
        component={Login}
        options={{
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name="face-man" color={color} focused={focused} />
          ),
          headerTitle: "Mangadex Login",
        }}
      />
    </Tab.Navigator>
  );
}
