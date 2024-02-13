import * as React from 'react';
import { Text, View, StyleSheet, Image } from 'react-native';

export default function LittleLemonHeader() {
  return (
    <View style={styles.headerContainer}>
      <Image 
        style={styles.logo}
        source={require('C:/Users/Talha PC/FirstProject/assets/logo.png')} // replace with the path to your logo file
      />
      <View style={styles.textContainer}>
        <Text style={styles.headerText}>Hey! Welcome </Text>
        <Text style={[styles.boldText, { color: 'yellow' }]}>Little Lemon </Text>
        <Text style={styles.headerText}> Shop</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    backgroundColor: '#a4c3bb', // Lemon color
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    borderRadius: 10,
    flexDirection: 'row', // layout logo and text in one line
    alignItems: 'center', // center items vertically
    justifyContent: 'space-between', // distribute items evenly
  },
  textContainer: {
    flexDirection: 'row', // layout the text in one line
    justifyContent: 'center', // center the text horizontally
    flex: 1, // take up the remaining space
  },
  headerText: {
    color: '#fff', // White color
    fontSize: 20,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  boldText: {
    fontWeight: 'bold',
    color: '#fff', // White color
    fontSize: 20,
  },
  logo: {
    width: 50, // or the size you want
    height: 50, // or the size you want
    resizeMode: 'contain', // to maintain the aspect ratio of the logo
  },
  buttonContainer: {
    // Add any styles you want for your button container
  },
});