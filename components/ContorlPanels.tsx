import React, { memo } from "react";
import { View, TouchableOpacity, StyleSheet } from "react-native";
import { MaterialCommunityIcons as Icon } from "@expo/vector-icons";
import { useTheme } from "../themes/ThemeProvider";

interface ControlPanelProps {
  onUndoPress: () => void;
  onClearPress: () => void;
  onHintPress: () => void;
}

const ControlPanel: React.FC<ControlPanelProps> = memo(
  ({ onUndoPress, onClearPress, onHintPress }) => {
    // console.log("ControlPanel Render");

    const { theme } = useTheme();

    const iconColor = theme.secondaryText;
    const iconBgColor = theme.secondaryBackground;

    return (
      <View style={styles.container}>
        <TouchableOpacity
          onPress={onUndoPress}
          style={[styles.button, { backgroundColor: iconBgColor }]}
        >
          <Icon name="undo" size={30} color={iconColor} />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={onClearPress}
          style={[styles.button, { backgroundColor: iconBgColor }]}
        >
          <Icon name="eraser" size={30} color={iconColor} />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={onHintPress}
          style={[styles.button, { backgroundColor: iconBgColor }]}
        >
          <Icon name="lightbulb" size={30} color={iconColor} />
        </TouchableOpacity>
      </View>
    );
  }
);

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    padding: 10,
  },
  button: {
    backgroundColor: "white",
    padding: 10,
    borderRadius: 50,
  },
});

export default ControlPanel;
