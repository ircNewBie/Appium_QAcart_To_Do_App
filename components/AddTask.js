import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";

const AddTask = props => {
  return (
    <TouchableOpacity style={styles.newTaskButton} onPress={props.handleClick}>
      <Text style={styles.newTaskButtonText}>Add new Task</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  newTaskButton: {
    width: "70%",
    backgroundColor: "#ed6663",
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderRadius: 100
  },
  newTaskButtonText: {
    color: "#1b262c",
    textAlign: "center"
  }
});

export default AddTask;
