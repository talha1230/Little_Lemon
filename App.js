import * as React from 'react';
import { Text, View, StyleSheet, Image } from 'react-native';
import LittleLemonHeader from './components/LittleLemonHeader';
import LittleLemonFooter from './components/LittleLemonFooter';
import Welcome from './components/Welcome';
export default function App() {
  return (
    <View style={styles.container}>
      <LittleLemonHeader />
    <LittleLemonFooter />
    <Welcome />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    //backgroundColor: '#ecf0f1',
    flex: 1,
    justifyContent: 'flex-start',
    backgroundColor: '#fffdd0', // light lemon color
    padding:20,
  },
});