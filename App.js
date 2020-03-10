import React, {useState, useEffect} from 'react';
import TasksScreen from './screens/TasksScreen';
import {TouchableWithoutFeedback} from 'react-native';
import AppNavigator from './navigation/navigation';
import Loading from './screens/LoadingScreen';
import firebase from './components/Firebase';
import {decode, encode} from 'base-64';

if (!global.btoa) {
  global.btoa = encode;
}

if (!global.atob) {
  global.atob = decode;
}

export default App = () => {
  const [user, setUser] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    firebase.auth().onAuthStateChanged(user => {
      setUser(user);
      setIsLoading(false);
    });
    return () => {
      console.log('unmount');
      clearInterval();
    };
  }, [user]);

  return (
    <TouchableWithoutFeedback>
      {isLoading ? <Loading /> : user ? <TasksScreen /> : <AppNavigator />}
    </TouchableWithoutFeedback>
  );
};
