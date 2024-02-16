import * as React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function LittleLemonHeader() {
  const navigation = useNavigation();

  const handleLoginPress = () => {
    navigation.navigate('Login');
  };

  const handleSignupPress = () => {
    navigation.navigate('Signup');
  };
  const handleProfilePress = () => {
    navigation.navigate('ProfileView'); // Navigate to ProfileView
  };

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
      <TouchableOpacity onPress={handleLoginPress} style={[styles.buttonContainer, styles.loginButton]}>
        <Text>Login</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={handleSignupPress} style={[styles.buttonContainer, styles.signupButton]}>
        <Text>Signup</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={handleProfilePress} style={[styles.buttonContainer, styles.profileViewButton]}>
        <Text>Profile</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    backgroundColor: '#a4c3bb',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexWrap: 'wrap', // Allow the items to wrap to a new line on smaller screens
  },
  textContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    flex: 1,
    flexWrap: 'wrap', // Allow the text to wrap to a new line on smaller screens
  },
  headerText: {
    color: '#fff',
    fontSize: 20,
    textAlign: 'center',
    fontWeight: 'bold',
    flexWrap: 'wrap', // Allow the text to wrap to a new line on smaller screens
  },
  boldText: {
    fontWeight: 'bold',
    color: '#fff',
    fontSize: 20,
    flexWrap: 'wrap', // Allow the text to wrap to a new line on smaller screens
  },
  logo: {
    width: 50,
    height: 50,
    resizeMode: 'contain',
    flexShrink: 1, // Allow the logo to shrink if necessary to prevent overflow
  },
  buttonContainer: {
    borderRadius: 10,
    paddingVertical: 8,
    paddingHorizontal: 16,
    flexShrink: 1, // Allow the buttons to shrink if necessary to prevent overflow
  },
  loginButton: {
    backgroundColor: '#fff',
    marginRight: 8,
  },
  signupButton: {
    backgroundColor: '#fff',
    marginLeft: 8,
  },
});