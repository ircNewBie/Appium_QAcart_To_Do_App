import React, {useState, useEffect} from 'react';
import {
  TouchableOpacity,
  Text,
  TextInput,
  StyleSheet,
  View,
  ScrollView,
  TouchableWithoutFeedback,
  Keyboard,
  ActivityIndicator,
} from 'react-native';

import Logo from '../components/Logo';
import firebase from '../components/Firebase';

const SignupScreen = props => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState(false);
  const [isLaoding, setIsLoading] = useState(false);

  const handleSignup = () => {
    setIsLoading(true);
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(user => {
        firebase
          .firestore()
          .collection('users')
          .doc(user.user.uid)
          .set({
            fullName,
            email,
          })
          .catch(error => {
            console.log(error.message);
          });
      })
      .then(() => {
        setFullName('');
        setEmail('');
        setPassword('');
        setIsLoading(false);
      })
      .catch(error => {
        setShowError(true);
        setErrorMessage(error.message);
        setEmail('');
        setPassword('');
        setIsLoading(false);
      });
  };

  return (
    <TouchableWithoutFeedback
      onPress={() => Keyboard.dismiss()}
      accessible={false}>
      <View style={styles.container}>
        <View style={styles.logoContainer}>
          <Logo />
        </View>
        <ScrollView style={styles.scrollContainer}>
          <View style={styles.loginContainer}>
            <TextInput
              style={styles.textInput}
              placeholder="Enter your Full name"
              value={fullName}
              onChangeText={value => setFullName(value)}
            />
            <TextInput
              style={styles.textInput}
              placeholder="Enter your Email"
              value={email}
              onChangeText={value => setEmail(value)}
            />
            <TextInput
              style={styles.textInput}
              placeholder="Enter your Password"
              value={password}
              onChangeText={value => setPassword(value)}
              secureTextEntry={true}
            />
            {isLaoding ? (
              <ActivityIndicator size="large" color="#fff" />
            ) : (
              <TouchableOpacity
                style={styles.loginButton}
                onPress={handleSignup}>
                <Text style={styles.buttonText}>Signup</Text>
              </TouchableOpacity>
            )}
            {showError ? (
              <Text style={styles.error}>{errorMessage}</Text>
            ) : null}
            <TouchableOpacity
              style={styles.signupButton}
              onPress={() => props.navigation.navigate('Login')}>
              <Text style={styles.buttonText}>Login</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1b262c',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  loginContainer: {
    flex: 1,
    width: '100%',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  scrollContainer: {
    width: '100%',
  },
  textInput: {
    backgroundColor: '#fff',
    marginBottom: 20,
    width: '80%',
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderRadius: 100,
  },
  loginButton: {
    width: '80%',
    backgroundColor: '#ed6663',
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderRadius: 100,
  },
  signupButton: {
    width: '80%',
    backgroundColor: '#ffa372',
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderRadius: 100,
    marginTop: 20,
  },
  buttonText: {
    color: '#1b262c',
    textAlign: 'center',
  },
  error: {
    marginVertical: 20,
    color: 'red',
    fontSize: 18,
    textAlign: 'center',
    padding: 20,
  },
});

export default SignupScreen;
