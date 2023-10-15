import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import HomeScreen from "../screens/HomeScreen";
import ProgressScreen from "../screens/ProgressScreen";
import HomeNavigation from "./HomeNavigation";
import { MaterialCommunityIcons as Icon } from "@expo/vector-icons";

const Tab = createBottomTabNavigator();

export default function AppNavigation() {
  return (
    <Tab.Navigator screenOptions={{ headerShown: false }}>
      <Tab.Screen
        name="Home"
        component={HomeNavigation}
        options={{
          tabBarShowLabel: false,
          tabBarIcon: ({ color, size }) => (
            <Icon name="home" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Progress"
        component={ProgressScreen}
        options={{
          tabBarShowLabel: false,
          tabBarIcon: ({ size, color }) => (
            <Icon name="table" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
