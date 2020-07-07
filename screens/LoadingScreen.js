import React from 'react';
import {View, Text, ActivityIndicator, StyleSheet} from 'react-native';
const Loading = () => {
  return (
    <View style={styles.container} accessible={false}>
      <Text style={styles.loadingText}>Loading</Text>
      <ActivityIndicator size="large" color="#fff" />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#1b262c',
  },
  loadingText: {
    color: '#fff',
    fontSize: 30,
    marginBottom: 20,
  },
});

export default Loading;
