import BottomTabs from "./BottomTabs";
import { NavigationContainer, ThemeProvider } from "@react-navigation/native";
import {
  DarkTheme as NavigationDarkTheme,
  DefaultTheme as NavigationDefaultTheme,
} from "@react-navigation/native";
import Gallery from "@screens/Common/Gallery";
import ChapterList from "@screens/Home/MangaDetails";
import { useColorScheme } from "react-native";
import { adaptNavigationTheme } from "react-native-paper";
import { createSharedElementStackNavigator } from "react-navigation-shared-element";

const Stack = createSharedElementStackNavigator<IRootStackParams>();

function RootNavigation() {
  return (
    <Stack.Navigator>
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

  const { LightTheme, DarkTheme } = adaptNavigationTheme({
    reactNavigationLight: NavigationDefaultTheme,
    reactNavigationDark: NavigationDarkTheme,
  });

  return (
    <ThemeProvider value={mode === "dark" ? DarkTheme : LightTheme}>
      <NavigationContainer>
        <RootNavigation />
      </NavigationContainer>
    </ThemeProvider>
  );
}
