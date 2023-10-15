import React, { useState, useEffect } from "react";
import { Animated, TouchableOpacity, Text, StyleSheet } from "react-native";
import { useTheme } from "../themes/ThemeProvider";

// Define the props for your SudokuCell component, including style props
interface SudokuCellProps {
  key: string | number;
  value: number;
  onPress: () => void;
  isSelected: boolean;
  highlightColumn: boolean;
  isInitial: boolean;
}

const SudokuCell: React.FC<SudokuCellProps> = React.memo(
  ({ value, onPress, isSelected, highlightColumn, isInitial }) => {
    // console.log("SudokuCell render", value, isInitial);

    const { theme } = useTheme();

    const textColor = isInitial ? theme.secondaryText : theme.commonBlue;

    const selectedCellStyle = {
      borderWidth: 1.5,
      backgroundColor: theme.activeColor,
    };

    const [animation] = useState(new Animated.Value(0));

    useEffect(() => {
      Animated.timing(animation, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }).start();
    }, []);

    return (
      <TouchableOpacity
        style={[
          styles.cell,
          { backgroundColor: theme.secondaryBackground },
          isSelected && selectedCellStyle,
          highlightColumn ? { borderRightWidth: 2 } : {},
          ,
        ]}
        onPress={onPress}
      >
        <Animated.Text
          style={[
            { opacity: animation },
            styles.cellText,
            value < 0 ? { color: theme.commonRed } : { color: textColor },
          ]}
        >
          {value < 0 ? value * -1 : value !== 0 ? value.toString() : ""}
        </Animated.Text>
      </TouchableOpacity>
    );
  }
);

const styles = StyleSheet.create({
  cell: {
    backgroundColor: "white",
    borderWidth: 0.5,
    borderColor: "gray",
    width: 43,
    height: 43,
    justifyContent: "center",
    alignItems: "center",
  },
  cellText: {
    fontSize: 24,
    fontWeight: "bold",
  },
});

export default SudokuCell;
