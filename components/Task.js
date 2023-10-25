import { useNavigation } from "@react-navigation/native";
import React from "react";
import { Text, View, StyleSheet, TouchableOpacity } from "react-native";
import Circle from "../assets/Circle";
import CircleCheck from "../assets/CircleCheck";

const Task = ({ note, dataSaved }) => {
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      onPress={() =>
        navigation.navigate("Details", {
          data: note,
          dataSaved: dataSaved,
        })
      }
      title="Details"
      style={styles.items}
    >
      <View style={styles.item}>
        <View style={styles.leftSide}>
          {note.complete ? (
            <CircleCheck height="30" width="30" />
          ) : (
            <Circle height="30" width="30" />
          )}

          <Text style={styles.itemText}>{note.text}</Text>
          <View style={styles.time}>
            <Text style={styles.dateText}> {note.date}</Text>
            <Text>{note.time}</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default Task;

const styles = StyleSheet.create({
  items: {
    paddingHorizontal: 20,
    paddingVertical: 20,
    marginTop: 20,
    backgroundColor: "#FFFFFF",
    borderRadius: 30,
    shadowColor: "#1B1B1B",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 20,
  },
  item: {
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "center",
  },
  leftSide: {
    justifyContent: "center",
    flexDirection: "row",
    alignItems: "center",
  },
  itemText: {
    fontWeight: "600",
    flex: 1,
    paddingHorizontal: 10,
    flexWrap: "wrap",
    color: "#1B1B1B",
  },
  time: { alignItems: "center", justifyContent: "center" },
  dateText: { fontSize: 10 },
});
