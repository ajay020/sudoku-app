import { View, Text, StyleSheet } from "react-native";
import React from "react";
import utility from "../utils/utility";
import { useTheme } from "../themes/ThemeProvider";

interface InfoHeaderProps {
  level: string;
  value: number;
}

const InfoHeader = ({ level, value }: InfoHeaderProps) => {
  const { theme } = useTheme();

  let levelName = level === "1" ? "Easy" : level === "2" ? "Medium" : "Hard";

  const textColor = theme.secondaryText;

  return (
    <View style={styles.container}>
      <Text style={{ color: textColor }}>{levelName}</Text>
      <Text style={{ color: textColor }}>{utility.formatTime(value)}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 8,
    paddingHorizontal: 2,
    width: 360,
    // backgroundColor: "lightgray",
    flexDirection: "row",
    justifyContent: "space-between",
  },
});

export default InfoHeader;
