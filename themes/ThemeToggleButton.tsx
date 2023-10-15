import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { MaterialCommunityIcons as Icon, Feather } from "@expo/vector-icons";

import { useTheme } from "./ThemeProvider";
import { lightTheme } from "./theme";

const ThemeToggleButton = () => {
  const { theme, toggleTheme } = useTheme();
  return (
    <View>
      <TouchableOpacity
        style={{ marginRight: 28, padding: 4 }}
        onPress={() => {
          toggleTheme();
        }}
      >
        <Feather
          name={theme === lightTheme ? "moon" : "sun"}
          size={24}
          color="gray"
        />
      </TouchableOpacity>
    </View>
  );
};

export default ThemeToggleButton;
