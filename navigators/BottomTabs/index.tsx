import Icon from "@components/Core/Icon";
import {
  BottomTabHeaderProps,
  createBottomTabNavigator,
} from "@react-navigation/bottom-tabs";
import { getHeaderTitle } from "@react-navigation/elements";
import { useTheme } from "@react-navigation/native";
import Login from "@screens/Auth";
import Home from "@screens/Home/Home";
import { Appbar } from "react-native-paper";

function TabBarIcon(props: {
  name: React.ComponentProps<typeof Icon>["name"];
  color: string;
}) {
  return <Icon size={28} style={{ marginBottom: -3 }} {...props} />;
}

export function MaterialYouHeader({ options, route }: BottomTabHeaderProps) {
  const title = getHeaderTitle(options, route.name);

  // const [showSearch, setShowSearch] = useState(false);

  // if (showSearch)
  //   return (
  //     <Appbar.Header>
  //       <Searchbar
  //         value=""
  //         autoFocus
  //         style={{ marginHorizontal: 8, marginBottom: 8, flex: 1 }}
  //         onBlur={() => setShowSearch(false)}
  //         // right="cross"
  //         icon="arrow-left"
  //         onIconPress={() => setShowSearch(false)}
  //       />
  //     </Appbar.Header>
  //   );

  return (
    <>
      <Appbar.Header>
        <Appbar.Content title={title} />
        {/* {options.headerRightContainerStyle ? (
          <Appbar.Action
            icon="search-web"
            onPress={() => setShowSearch((x) => !x)}
          />
        ) : null} */}
      </Appbar.Header>
    </>
  );
}

const Tab = createBottomTabNavigator<IRootBottomTabsParams>();

export default function BottomTabs() {
  const theme = useTheme();

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
          // headerRightContainerStyle: {},
          tabBarIcon: ({ color }) => <TabBarIcon name="home" color={color} />,
        }}
      />
      <Tab.Screen
        name="Login"
        component={Login}
        options={{
          tabBarIcon: ({ color }) => (
            <TabBarIcon name="face-man" color={color} />
          ),
          headerTitle: "Mangadex Login",
        }}
      />
    </Tab.Navigator>
  );
}
