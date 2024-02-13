import * as React from 'react';
import { View, StyleSheet } from 'react-native';

import LittleLemonHeader from './components/LittleLemonHeader';
import LittleLemonFooter from './components/LittleLemonFooter';
import Welcome from './components/Welcome';
import MenuItems from './components/MenuItems';

export default function App() {
  return (
    <View style={styles.container}>
      <LittleLemonHeader />
      <Welcome />
      <MenuItems />

      <LittleLemonFooter />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    backgroundColor: '#fffdd0', // light lemon color
    padding: 20,
  },
});