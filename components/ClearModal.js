import React from "react";

import {
  Text,
  View,
  Pressable,
  TextInput,
  Modal,
  StyleSheet,
} from "react-native";
import Close from "../assets/Close";

const ClearModal = ({
  setModalClearVisible,
  modalClearVisible,
  clearAllTasks,
}) => {
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={modalClearVisible}
      onRequestClose={() => {
        setModalClearVisible(false);
      }}
    >
      <View style={styles.modalBackground}>
        <View style={styles.modalView}>
          <View style={styles.modalBox}>
            <Text style={styles.sectionTitle}>
              Do you want to delete all tasks?
            </Text>
            <View style={styles.buttons}>
              <Pressable onPress={() => setModalClearVisible(false)}>
                <Close height="50" width="50" />
              </Pressable>
              <Pressable style={styles.buttonYes} onPress={clearAllTasks}>
                <Text style={styles.textStyle}>Yes, delete</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </View>
    </Modal>
  );
};
export default ClearModal;

const styles = StyleSheet.create({
  modalBackground: { backgroundColor: "rgba(0, 0, 0, 0.3)", height: "100%" },
  modalBox: {
    display: "flex",
    alignSelf: "center",
    backgroundColor: "white",
    borderRadius: 30,

    width: "90%",
    padding: 20,
    marginTop: "80%",
  },

  sectionTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#1B1B1B",
    paddingBottom: 20,
  },
  buttonYes: {
    justifyContent: "center",
    backgroundColor: "#E2FCD2",
    width: "70%",
    height: 50,
    borderRadius: 30,
    marginLeft: 30,
  },
  textStyle: {
    color: "#77EEA9",
    fontWeight: "bold",
    textAlign: "center",
  },
  buttons: {
    flexDirection: "row",
  },
});
