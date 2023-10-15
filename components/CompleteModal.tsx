import { Modal, Text, View, StyleSheet, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";

import utility from "../utils/utility";
import { useTheme } from "../themes/ThemeProvider";

interface ComplteModalProps {
  isVisible: boolean;
  onClose: () => void;
  time: number;
}

const CompleteModal = ({ isVisible, onClose, time }: ComplteModalProps) => {
  const navigation = useNavigation();
  const { theme } = useTheme();

  const modalBgColor = theme.secondaryBackground;
  const textColor = theme.secondaryText;

  const textStyle = {
    color: textColor,
  };

  return (
    <Modal transparent={true} visible={isVisible} animationType="slide">
      <View style={styles.modalContainer}>
        <View style={[styles.modalContent, { backgroundColor: modalBgColor }]}>
          <Text style={[styles.modalText, textStyle]}>Congratulations! 🎉</Text>
          <Text style={[styles.modalText, textStyle]}>
            Keep sharpening your mind with more challenges.
          </Text>
          <Text style={[styles.modalText, textStyle]}>
            Time taken: {utility.formatTime(time)}
          </Text>
          <TouchableOpacity
            onPress={() => {
              // Close the modal
              onClose();
              // Navigate back to the previous screen
              navigation.goBack();
            }}
            style={styles.Btn}
          >
            <Text style={{ color: "white", fontSize: 22, marginTop: 2 }}>
              Next Challange
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.7)",
  },
  Btn: {
    backgroundColor: "dodgerblue",
    padding: 10,
    borderRadius: 8,
    alignItems: "center",
  },
  modalContent: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    width: "85%",
    gap: 10,
  },
  modalText: {
    fontSize: 20,
    marginBottom: 10,
  },
});

export default CompleteModal;
