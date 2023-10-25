import React from "react";
import DatePicker, { getToday } from "react-native-modern-datepicker";
import Close from "../assets/Close";
import {
  Text,
  View,
  StyleSheet,
  Pressable,
  TextInput,
  Modal,
} from "react-native";

const NewTaskModal = ({
  setModalNewTaskVisible,
  modalNewTaskVisible,
  handleSave,
  setFormData,
  formData,
}) => {
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={modalNewTaskVisible}
      onRequestClose={() => {
        setModalNewTaskVisible(!modalNewTaskVisible);
      }}
    >
      <View style={styles.modalView}>
        <View style={styles.modalBox}>
          <Text style={styles.sectionTitle}>New Todo</Text>
          <View style={styles.formInputs}>
            <TextInput
              onChangeText={(text) => setFormData({ ...formData, text: text })}
              placeholder="useless placeholder"
              keyboardType="default"
            />
            <DatePicker
              current={getToday()}
              selected={getToday()}
              minimumDate={getToday()}
              onTimeChange={(time) => setFormData({ ...formData, time: time })}
              onDateChange={(date) => setFormData({ ...formData, date: date })}
            />
          </View>
          <View style={styles.buttons}>
            <Pressable
              onPress={() => setModalNewTaskVisible(!modalNewTaskVisible)}
            >
              <Close height="50" width="50" />
            </Pressable>
            <Pressable style={styles.buttonAdd} onPress={handleSave}>
              <Text style={styles.textStyle}>Add todo</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  );
};
export default NewTaskModal;

const styles = StyleSheet.create({
  modalBox: {
    display: "flex",
    alignSelf: "center",
    backgroundColor: "white",
    borderRadius: 30,
    height: "90%",
    width: "90%",
    padding: 20,
    marginTop: 50,
  },
  buttons: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    gap: 20,
  },
  buttonAdd: {
    justifyContent: "center",
    backgroundColor: "#E2FCD2",
    width: "70%",
    height: 50,
    borderRadius: 30,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#1B1B1B",
    paddingBottom: 20,
  },

  textStyle: {
    color: "#77EEA9",
    fontWeight: "bold",
    textAlign: "center",
  },
  formInputs: {
    height: "85%",
  },
});
