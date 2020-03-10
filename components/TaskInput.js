import React from "react";
import {
  StyleSheet,
  Modal,
  TouchableOpacity,
  Text,
  TextInput,
  View,
  TouchableWithoutFeedback,
  Keyboard
} from "react-native";
import Logo from "./Logo";

const TaskInput = props => {
  return (
    <Modal visible={props.visible} animationType="fade">
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <View style={styles.modalContainer}>
          <Logo />
          <TextInput
            accessibilityLabel="NewTask"
            testID="NewTask"
            style={styles.newTaskInput}
            placeholder="Enter a new Task"
            value={props.newTask}
            onChangeText={value => props.inputChange(value)}
          />
          <TouchableOpacity
            style={styles.newTaskButton}
            onPress={props.addNewTask}
          >
            <Text style={styles.newTaskButtonText}>Add new Task</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.cancelTaskButton}
            onPress={props.cancelAddEvent}
          >
            <Text style={styles.newTaskButtonText}>Back</Text>
          </TouchableOpacity>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#1b262c"
  },
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
  },
  newTaskInput: {
    backgroundColor: "#fff",
    marginBottom: 20,
    width: "70%",
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderRadius: 100
  },
  cancelTaskButton: {
    width: "70%",
    backgroundColor: "#ffa372",
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderRadius: 100,
    marginTop: 20
  }
});

export default TaskInput;
