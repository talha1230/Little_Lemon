import React, { useState, useRef } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Animated } from 'react-native';
import { auth } from 'C:/Users/Talha PC/FirstProject/FirebaseConfigs.ts';
import { signInWithEmailAndPassword } from 'firebase/auth';

const Login = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const fadeAnim = useRef(new Animated.Value(0)).current;

  const handleLogin = () => {
    setLoading(true);
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log('User logged in:', user.uid);
        setSuccessMessage('Login successful!');
        // Clear success message after 3 seconds
        setTimeout(() => {
          setSuccessMessage('');
       
        }, 3000);
        // Start animation
        Animated.timing(fadeAnim, {
          toValue: 1, // Fade in
          duration: 1000, // Animation duration
          useNativeDriver: true,
        }).start(() => {
          // Start fade out animation after 2 seconds
          setTimeout(() => {
            Animated.timing(fadeAnim, {
              toValue: 0, // Fade out
              duration: 1000, // Animation duration
              useNativeDriver: true,
            }).start();
          }, 2000);
        });
      })
      .catch((error) => {
        const errorMessage = error.message;
        console.error('Login error:', errorMessage);
        // Handle login errors
      })
      .finally(() => {
        setLoading(false);
      });
  };
  
  return (
    <View style={styles.container}>
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
      {successMessage ? (
        <Animated.Text style={[styles.successMessage, { opacity: fadeAnim }]}>
          {successMessage}
        </Animated.Text>
      ) : null}
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
    </View>
  );
  };
  
  const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  input: {
    width: '100%',
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    marginBottom: 10,
    padding: 10,
  },
  loginButton: {
    width: '100%',
    backgroundColor: '#007bff',
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
  },
  successMessage: {
    color: 'green',
    marginBottom: 10,
  },
  });
  
  export default Login;
  