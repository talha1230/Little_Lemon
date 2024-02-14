import React, { useState, useRef } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Animated, Image } from 'react-native';
import { auth } from 'C:/Users/Talha PC/FirstProject/FirebaseConfigs.ts'; // Import the auth instance from your Firebase setup file
import { signInWithEmailAndPassword } from 'firebase/auth';
import { MaterialIcons } from '@expo/vector-icons'; // Import icons from expo
import * as Animatable from 'react-native-animatable'; // Import animatable library
import * as Font from 'expo-font'; // Import font library

// Import lemon image
import LemonImage from'C:/Users/Talha PC/FirstProject/assets/SignupPhoto.jpg';

// Load fonts from Google Fonts
Font.loadAsync({
  Lemonada: require('C:/Users/Talha PC/FirstProject/assets/fonts/Lemonada.ttf'),
  LemonMilk: require('C:/Users/Talha PC/FirstProject/assets/fonts/LemonMilk.ttf'),
});

const Login = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const successOpacity = useRef(new Animated.Value(0)).current;

  const handleLogin = () => {
    setLoading(true);
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log('User logged in:', user.uid);
        // Trigger success message animation
        Animated.timing(successOpacity, {
          toValue: 1,
          duration: 500,
          useNativeDriver: true,
        }).start();
        // Clear success message after 3 seconds
        setTimeout(() => {
          setLoading(false);
          setEmail('');
          setPassword('');
          Animated.timing(successOpacity, {
            toValue: 0,
            duration: 500,
            useNativeDriver: true,
          }).start();
        }, 3000);
      })
      .catch((error) => {
        console.error('Login error:', error.message);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <View style={styles.container}>
      {/* Add a lemon image on the top of the page */}
      <Animatable.Image
        source={LemonImage}
        style={styles.lemonImage}
        animation="bounceIn"
        duration={1000}
      />
      <Text style={styles.title}>Login</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        onChangeText={setEmail}
        value={email}
        autoCapitalize="none"
        keyboardType="email-address"
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        onChangeText={setPassword}
        value={password}
        secureTextEntry
      />
      <TouchableOpacity
        style={styles.loginButton}
        onPress={handleLogin}
        disabled={loading}
      >
        <Text style={styles.buttonText}>{loading ? 'Logging in...' : 'Login'}</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.goBack()}
        disabled={loading}
      >
        <Text style={styles.buttonText}>Back</Text>
      </TouchableOpacity>
      <Animated.View style={[styles.successMessage, { opacity: successOpacity }]}>
        <Text style={styles.successText}>Login successful!</Text>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#fffacd', // Change the background color to a light yellow
  },
  lemonImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    color: '#228b22', // Change the title color to a dark green
    fontFamily: 'Lemonada', // Change the title font to Lemonada
  },
  input: {
    width: '100%',
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    marginBottom: 10,
    padding: 10,
    color: '#228b22', // Change the input text color to a dark green
    fontFamily: 'LemonMilk', // Change the input font to Lemon Milk
  },
  loginButton: {
    width: '100%',
    backgroundColor: '#32cd32', // Change the login button color to a bright green
    paddingVertical: 12,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 10,
  },
  backButton: {
    width: '100%',
    backgroundColor: '#6c757d',
    paddingVertical: 12,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    fontFamily: 'LemonMilk', // Change the button font to Lemon Milk
  },
  successMessage: {
    position: 'absolute',
    bottom: 20,
    backgroundColor: 'green',
    padding: 10,
    borderRadius: 5,
  },
  successText: {
    color: '#fff',
    fontSize: 16,
    fontFamily: 'LemonMilk', // Change the success text font to Lemon Milk
  },
});

export default Login;
