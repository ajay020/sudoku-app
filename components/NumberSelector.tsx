import React from "react";
import { View, TouchableOpacity, Text, StyleSheet } from "react-native";
import { useTheme } from "../themes/ThemeProvider";

interface NumberSelectorProps {
  onSelectNumber: (number: number) => void;
}

const NumberSelector: React.FC<NumberSelectorProps> = React.memo(
  ({ onSelectNumber }) => {
    // console.log("NumberSelector render");
    const { theme } = useTheme();

    const textColor = theme.commonBlue;
    const numBgColor = theme.secondaryBackground;

    return (
      <View style={[styles.numberSelector]}>
        {Array.from({ length: 9 }, (_, index) => (
          <TouchableOpacity
            key={index}
            style={[styles.numberButton, { backgroundColor: numBgColor }]}
            onPress={() => onSelectNumber(index + 1)}
          >
            <Text style={[styles.numberText, { color: textColor }]}>
              {index + 1}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    );
  }
);

const styles = StyleSheet.create({
  numberSelector: {
    flexDirection: "row",
    flexWrap: "wrap",
    // width: "90%",
    gap: 8,
    padding: 12,
    justifyContent: "center",
    // backgroundColor: "white",
  },
  numberButton: {
    padding: 20,
    // borderWidth: 1,
    // borderColor: "gray",
    borderRadius: 50,
    elevation: 10,
  },
  numberText: {
    fontSize: 24,
    color: "dodgerblue",
    fontWeight: "bold",
  },
});

export default NumberSelector;
