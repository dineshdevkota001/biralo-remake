import BottomTabs from "./BottomTabs";
import { getHeaderTitle } from "@react-navigation/elements";
import { NavigationContainer, ThemeProvider } from "@react-navigation/native";
import {
  DarkTheme as NavigationDarkTheme,
  DefaultTheme as NavigationDefaultTheme,
} from "@react-navigation/native";
import { StackHeaderProps } from "@react-navigation/stack";
import Gallery from "@screens/Common/Gallery";
import ChapterList from "@screens/Home/MangaDetails";
import { getTitle } from "@utils/getLocalizedString";
import { StatusBar } from "react-native";
import { useColorScheme } from "react-native";
import {
  MD3DarkTheme,
  MD3LightTheme,
  adaptNavigationTheme,
  useTheme,
} from "react-native-paper";
import { Appbar } from "react-native-paper";
import { createSharedElementStackNavigator } from "react-navigation-shared-element";

export function MaterialYouHeader({
  options,
  route,
  navigation,
  back,
}: StackHeaderProps) {
  const title = getHeaderTitle(options, route.name);
  return (
    <Appbar.Header>
      {back ? <Appbar.BackAction onPress={navigation.goBack} /> : null}
      <Appbar.Content title={title} />
    </Appbar.Header>
  );
}

const Stack = createSharedElementStackNavigator<IRootStackParams>();

function RootNavigation() {
  return (
    <Stack.Navigator
      screenOptions={{
        header: MaterialYouHeader,
      }}
    >
      <Stack.Screen
        name="Bottom Tabs"
        component={BottomTabs}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Chapter List"
        component={ChapterList}
        options={({ route }) => ({
          title: getTitle(route.params.manga.attributes.title),
        })}
        sharedElements={(route) => {
          const { id } = route.params;
          return [`${id}.cover`];
        }}
      />
      <Stack.Screen
        name="Gallery"
        component={Gallery}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
}

export default function Navigation() {
  const mode = useColorScheme();
  const theme = useTheme();

  const { LightTheme, DarkTheme } = adaptNavigationTheme({
    reactNavigationLight: NavigationDefaultTheme,
    reactNavigationDark: NavigationDarkTheme,
  });

  const CombinedLightTheme = {
    ...LightTheme,
    ...MD3LightTheme,
    colors: {
      ...LightTheme.colors,
      ...MD3LightTheme.colors,
    },
  };
  const CombinedDarkTheme = {
    ...DarkTheme,
    ...MD3DarkTheme,
    colors: {
      ...DarkTheme.colors,
      ...MD3DarkTheme.colors,
    },
  };

  return (
    <NavigationContainer
      theme={mode === "dark" ? CombinedDarkTheme : CombinedLightTheme}
    >
      <StatusBar
        barStyle={mode === "dark" ? "light-content" : "dark-content"}
      />
      <RootNavigation />
    </NavigationContainer>
  );
}
