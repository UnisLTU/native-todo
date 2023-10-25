import React, { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Text, View, StyleSheet, Pressable, StatusBar } from "react-native";
import CirclePlus from "../assets/CirclePlus";
import Tasks from "./Tasks";
import NewTaskModal from "./NewTaskModal";
import ClearModal from "./ClearModal";
import { useIsFocused } from "@react-navigation/native";

const Home = () => {
  const [modalNewTaskVisible, setModalNewTaskVisible] = useState(false);
  const [formData, setFormData] = useState({
    uid: Date.now().toString(),
    date: "",
    time: "",
    text: "",
    complete: false,
  });
  const [dataSaved, setDataSaved] = useState([]);
  const [modalClearVisible, setModalClearVisible] = useState(false);

  const isFocused = useIsFocused();

  useEffect(() => {
    retrieveData();
  }, [isFocused]);

  const retrieveData = async () => {
    try {
      const data = await AsyncStorage.getItem("data");
      if (data !== null) {
        setDataSaved(JSON.parse(data));
        console.log("Retrieved data: ", JSON.parse(data));
      } else {
        console.log("No data found in AsyncStorage");
      }
    } catch (error) {
      console.log("Error retrieving data:", error);
    }
  };

  const saveData = async (formData) => {
    try {
      const addingNewTask = [...dataSaved, formData];
      const dataToSave = JSON.stringify(addingNewTask);

      await AsyncStorage.setItem("data", dataToSave);

      console.log("Data saved successfully!");
    } catch (error) {
      console.error("Error saving data:", error);
    }
  };

  const handleSave = async () => {
    setFormData({ ...formData, uid: Date.now().toString() });
    await saveData(formData);
    setModalNewTaskVisible(!modalNewTaskVisible);
    retrieveData();
    setFormData({
      uid: Date.now().toString(),
      date: "",
      time: "",
      text: "",
      complete: false,
    });
  };

  const clearAllTasks = async () => {
    try {
      await AsyncStorage.clear();
      console.log("AsyncStorage data cleared successfully.");
      setDataSaved([]);
      setModalClearVisible(false);
    } catch (error) {
      console.error("Error clearing AsyncStorage data:", error);
    }
  };

  const completedItems = dataSaved.filter((item) => item.complete === true);
  const countOfCompleted = completedItems.length;

  const uncompletedItems = dataSaved.filter((item) => item.complete === false);
  const countOfUncompleted = uncompletedItems.length;

  return (
    <>
      <StatusBar />

      <View style={styles.tasksWrapper}>
        <View>
          <Text style={styles.sectionTitle}>Today's todos</Text>
          <Text style={styles.completedText}>
            You completed {countOfCompleted} tasks 🎉
          </Text>

          <Text style={styles.completedText}>
            Still have {countOfUncompleted} task to go 🚨
          </Text>
        </View>
        <Pressable
          style={styles.clearButton}
          onPress={() => setModalClearVisible(true)}
        >
          <Text style={styles.textClear}>Clear all tasks</Text>
        </Pressable>
      </View>

      <Tasks dataSaved={dataSaved} />

      <Pressable
        activeOpacity={1}
        style={styles.newEvent}
        onPress={() => setModalNewTaskVisible(true)}
      >
        <Text style={styles.newEventText}>New Task</Text>
        <CirclePlus height="40" width="40" />
      </Pressable>

      <NewTaskModal
        setModalNewTaskVisible={setModalNewTaskVisible}
        modalNewTaskVisible={modalNewTaskVisible}
        handleSave={handleSave}
        setFormData={setFormData}
        formData={formData}
      />
      <ClearModal
        setModalClearVisible={setModalClearVisible}
        modalClearVisible={modalClearVisible}
        clearAllTasks={clearAllTasks}
      />
    </>
  );
};

export default Home;

const styles = StyleSheet.create({
  tasksWrapper: {
    display: "flex",
    alignItems: "center",
    flexDirection: "row",
    paddingTop: 60,
    paddingHorizontal: 20,
    backgroundColor: "#F5EDED",
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#1B1B1B",
    paddingBottom: 20,
  },
  completedText: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#1B1B1B",
    paddingBottom: 10,
  },
  modalView: {
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.3)",
  },
  newEvent: {
    flexDirection: "row",
    justifyContent: "center",
    height: 100,
    paddingBottom: 20,
    alignItems: "center",
    backgroundColor: "#F47B81",
    width: "auto",
    shadowColor: "#F47B81",
    shadowOpacity: 2,
    shadowRadius: 2,
    elevation: 20,
  },
  newEventText: { fontSize: 24, color: "#FFFFFF", paddingRight: 20 },

  clearButton: {
    marginLeft: 20,
    backgroundColor: "red",
    justifyContent: "center",
    height: 70,
    padding: 20,
    borderRadius: 30,
  },
  textClear: { color: "white", fontWeight: "700" },
});
