import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { useTheme } from "../themes/ThemeProvider";

export type RootStackParamList = {
  Play: { level: "1" | "2" | "3" };
};

type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, "Play">;

const HomeScreen = () => {
  const navigation = useNavigation<HomeScreenNavigationProp>();
  const { theme } = useTheme();

  const navigateToLevel = (level: "1" | "2" | "3") => {
    navigation.navigate("Play", { level });
  };

  let textColor = theme.secondaryText;
  let btnBgColor = theme.secondaryBackground;

  return (
    <View
      style={[styles.Container, { backgroundColor: theme.primaryBackground }]}
    >
      <TouchableOpacity
        style={[styles.Btn, { backgroundColor: btnBgColor }]}
        onPress={() => navigateToLevel("1")}
      >
        <Text style={[styles.text, { color: textColor }]}>Easy</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.Btn, { backgroundColor: btnBgColor }]}
        onPress={() => navigateToLevel("2")}
      >
        <Text style={[styles.text, { color: textColor }]}>Medium</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.Btn, , { backgroundColor: btnBgColor }]}
        onPress={() => navigateToLevel("3")}
      >
        <Text style={[styles.text, { color: textColor }]}>Hard</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  Btn: {
    alignItems: "center",
    backgroundColor: "white",
    elevation: 1,
    borderRadius: 8,
    padding: 18,
  },
  Container: {
    flex: 1,
    gap: 16,
    // backgroundColor: "gray",
    justifyContent: "center",
    paddingHorizontal: 28,
  },
  text: {
    fontSize: 24,
    fontWeight: "bold",
  },
});

export default HomeScreen;
