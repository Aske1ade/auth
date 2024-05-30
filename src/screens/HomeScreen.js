import React from 'react';
import { View, Button, StyleSheet } from 'react-native';

const HomeScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Button
        title="Go to Auth"
        onPress={() => navigation.navigate('Auth')}
      />
      <Button
        title="Go to Businesses"
        onPress={() => navigation.navigate('Businesses')}
      />
      <Button
        title="Send Data"
        onPress={() => navigation.navigate('SendData')}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default HomeScreen;
