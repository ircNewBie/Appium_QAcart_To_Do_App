import React from "react";
import { StyleSheet, TouchableOpacity, Text } from "react-native";

const Task = props => {
  return (
    <TouchableOpacity
      style={styles.taskContainer}
      onLongPress={props.onDelete.bind(this, props.id)}
    >
      <Text style={styles.newTaskButtonText}>{props.item}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  taskContainer: {
    width: "70%",
    backgroundColor: "#ffa372",
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderRadius: 100,
    marginBottom: 10
  },
  newTaskButtonText: {
    color: "#1b262c"
  }
});

export default Task;
