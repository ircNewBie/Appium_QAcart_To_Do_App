import React from 'react';
import {StyleSheet, TouchableOpacity, Text} from 'react-native';

const Task = props => {
  return (
    <TouchableOpacity
      style={
        props.completed ? styles.taskContainerCompleted : styles.taskContainer
      }
      onPress={props.onComplete.bind(this, props.id, props.completed)}
      onLongPress={props.onDelete.bind(this, props.id)}>
      <Text
        style={
          props.completed
            ? styles.newTaskButtonTextCompleted
            : styles.newTaskButtonText
        }>
        {props.item}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  taskContainer: {
    width: '70%',
    backgroundColor: '#ffa390',
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderRadius: 100,
    marginBottom: 10,
  },
  taskContainerCompleted: {
    width: '70%',
    backgroundColor: '#29c7ac',
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderRadius: 100,
    marginBottom: 10,
  },
  newTaskButtonText: {
    color: '#1b262c',
  },
  newTaskButtonTextCompleted: {
    color: '#1b262c',
    textDecorationLine: 'line-through',
  },
});

export default Task;
