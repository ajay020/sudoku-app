import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "../screens/HomeScreen";
import PlayScreen from "../screens/PlayScreen";
import ThemeToggleButton from "../themes/ThemeToggleButton";
import { useTheme } from "../themes/ThemeProvider";

const Stack = createStackNavigator();

export default function HomeNavigation() {
  const { theme } = useTheme();

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: true,
        headerStyle: { backgroundColor: theme.secondaryBackground },
        headerTintColor: theme.secondaryText,
        headerTitleAlign: "center",
      }}
    >
      <Stack.Screen
        name="home2"
        component={HomeScreen}
        options={{ title: "Sudoku", headerRight: () => <ThemeToggleButton /> }}
      />
      <Stack.Screen
        name="Play"
        component={PlayScreen}
        options={{
          title: "",
          headerRight: () => <ThemeToggleButton />,
        }}
      />
    </Stack.Navigator>
  );
}
