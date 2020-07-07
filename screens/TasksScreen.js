import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  TouchableNativeFeedback,
  TouchableOpacity,
} from 'react-native';
import Logo from '../components/Logo';
import AddTask from '../components/AddTask';
import Task from '../components/Task';
import TaskInput from '../components/TaskInput';
import firebase from '../components/Firebase';

export default function TasksScreen() {
  const [isModalOpened, setIsModalOpened] = useState(false);
  const [tasks, setTasks] = useState([]);
  const [fetchedTasks, setFetchedTasks] = useState([]);
  const [newTask, setNewTask] = useState('');
  const [completed, setCompleted] = useState(false);
  const currentUser = firebase.auth().currentUser.uid;

  useEffect(() => {
    firebase
      .firestore()
      .collection('users')
      .doc(currentUser)
      .collection('todos')
      .get()
      .then(snapshot => {
        return snapshot.docs.map(doc => doc.data());
      })
      .then(data => {
        setTasks(data);
      });
    return () => {
      console.log('unmounted fetch data');
    };
  }, [fetchedTasks]);

  const triggerModal = () => {
    setIsModalOpened(true);
  };

  const handleNewTask = () => {
    firebase
      .firestore()
      .collection('users')
      .doc(currentUser)
      .collection('todos')
      .add({
        item: newTask,
        id: Math.random(),
        completed: completed,
      });
    setFetchedTasks(Math.random);

    setNewTask('');
    setIsModalOpened(false);
  };

  const handleCancelAddEvent = () => {
    console.log(tasks);
    setIsModalOpened(false);
  };

  const handleComplete = (id, Taskcompleted) => {
    firebase
      .firestore()
      .collection('users')
      .doc(currentUser)
      .collection('todos')
      .get()
      .then(snapshot => {
        const selectedDoc = snapshot.docs.find(doc => doc.data().id === id).id;
        firebase
          .firestore()
          .collection('users')
          .doc(currentUser)
          .collection('todos')
          .doc(selectedDoc)
          .update({
            completed: !Taskcompleted,
          })
          .then(() => {
            setFetchedTasks(Math.random);
          });
      });
  };

  const onInputChange = value => {
    setNewTask(value);
  };

  const handleDelete = id => {
    firebase
      .firestore()
      .collection('users')
      .doc(currentUser)
      .collection('todos')
      .get()
      .then(snapshot => {
        const selectedDoc = snapshot.docs.find(doc => doc.data().id === id).id;
        firebase
          .firestore()
          .collection('users')
          .doc(currentUser)
          .collection('todos')
          .doc(selectedDoc)
          .delete()
          .then(() => {
            setFetchedTasks(Math.random);
          });
      });
  };

  return (
    <View style={styles.container} accessible={false}>
      <View style={styles.logoContainer}>
        <Logo />
        <TouchableOpacity
          accessible={false}
          style={styles.logoutContainer}
          onPress={() => firebase.auth().signOut()}>
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>
        <AddTask handleClick={triggerModal} />
        <TaskInput
          inputChange={onInputChange}
          addNewTask={handleNewTask}
          newTask={newTask}
          visible={isModalOpened}
          cancelAddEvent={handleCancelAddEvent}
        />
      </View>
      <ScrollView style={styles.scrollView}>
        <View style={styles.tasksList}>
          <Text style={styles.listHeader}>All Tasks</Text>
          {tasks.map(task => (
            <Task
              id={task.id}
              onDelete={handleDelete}
              key={task.id}
              item={task.item}
              onComplete={handleComplete}
              completed={task.completed}
            />
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1b262c',
  },
  logoContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tasksList: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  listHeader: {
    color: '#fff',
    fontSize: 20,
    textDecorationStyle: 'solid',
    marginBottom: 20,
    textAlign: 'center',
  },
  scrollView: {
    flex: 1,
  },
  logoutContainer: {
    width: '30%',
    backgroundColor: '#0f4c81',
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderRadius: 100,
    marginBottom: 20,
  },
  logoutText: {
    color: '#fff',
    textAlign: 'center',
  },
});
