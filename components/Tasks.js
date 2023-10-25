import React from "react";
import { Text, View, ScrollView, StyleSheet, Button } from "react-native";
import Task from "./Task";
import Todo from "../assets/Todo";

const Tasks = ({ dataSaved, retrieveData }) => {
  return (
    <View style={styles.container}>
      <View style={styles.SVGback}>
        <Todo height="300" width="400" />
      </View>
      <ScrollView style={styles.scrollable}>
        <View style={styles.tasks}>
          {dataSaved.length === 0 ? (
            <Text>No tasks</Text>
          ) : (
            dataSaved.map((note, index) => {
              return (
                <Task
                  key={index}
                  note={note}
                  dataSaved={dataSaved}
                  retrieveData={retrieveData}
                />
              );
            })
          )}
        </View>
      </ScrollView>
    </View>
  );
};

export default Tasks;

const styles = StyleSheet.create({
  scrollable: { height: 550 },
  container: { backgroundColor: "#F5EDED" },
  tasks: { paddingHorizontal: 20, zIndex: 4 },
  SVGback: {
    position: "absolute",
    zIndex: 0,
    left: 20,
    top: "58%",
  },
});
