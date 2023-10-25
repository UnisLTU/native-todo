import React from "react";
import { useNavigation } from "@react-navigation/native";
import { View, Text, StyleSheet, Pressable } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Details = ({ route }) => {
  const navigation = useNavigation();
  const note = route.params.data;
  const dataSaved = route.params.dataSaved;

  const handleComplete = async () => {
    try {
      const updatedData = dataSaved.map((item) => {
        if (item.uid === note.uid) {
          return { ...item, complete: true };
        }
        return item;
      });

      const dataToSave = JSON.stringify(updatedData);
      await AsyncStorage.setItem("data", dataToSave);
      navigation.navigate("Home");

      console.log("Data saved successfully!");
    } catch (error) {
      console.error("Error saving data:", error);
    }
  };

  const handleDelete = async () => {
    try {
      const updatedData = dataSaved.filter((item) => item.uid !== note.uid);

      const dataToSave = JSON.stringify(updatedData);
      await AsyncStorage.setItem("data", dataToSave);
      navigation.navigate("Home");

      console.log("Data saved successfully!");
    } catch (error) {
      console.error("Error saving data:", error);
    }
  };

  const handleEdit = () => {};

  return (
    <View style={styles.noteScreen}>
      <View style={styles.note}>
        <Text style={styles.noteText}>{note.text}</Text>
        <Text style={styles.noteText}>{note.date}</Text>
        <Text style={styles.noteText}>{note.time}</Text>
      </View>
      <View>
        <View style={styles.utilityButtons}>
          <Pressable onPress={handleEdit} style={styles.completeButton}>
            <Text>Edit</Text>
          </Pressable>
          <Pressable onPress={handleDelete} style={styles.deleteButton}>
            <Text>Delete</Text>
          </Pressable>
        </View>
        <View style={styles.utilityButtons}>
          <Pressable
            onPress={
              note.complete
                ? () => {
                    alert("Already completed");
                  }
                : handleComplete
            }
            style={styles.completeButton}
          >
            <Text>Complete</Text>
          </Pressable>
          <Pressable
            onPress={() => navigation.navigate("Home")}
            style={styles.deleteButton}
          >
            <Text>Close</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
};

export default Details;

const styles = StyleSheet.create({
  noteScreen: {
    backgroundColor: "#0f0f0f",
    height: "100%",
    flexDirection: "column",
    justifyContent: "space-between",
  },

  note: {
    paddingHorizontal: 20,
    alignItems: "center",
    flexDirection: "column",
    marginTop: 40,
  },
  noteText: {
    paddingVertical: 10,
    paddingVertical: 10,
    textAlign: "center",
    flexWrap: "wrap",
    fontSize: 24,
    color: "#fff",
  },
  utilityButtons: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 20,
  },
  completeButton: {
    marginHorizontal: 10,
    borderRadius: 10,
    width: 150,
    height: 50,
    backgroundColor: "mediumseagreen",
    justifyContent: "center",
    alignItems: "center",
  },
  deleteButton: {
    marginHorizontal: 10,
    borderRadius: 10,
    width: 150,
    height: 50,
    backgroundColor: "#ff6347",
    justifyContent: "center",
    alignItems: "center",
  },
});
