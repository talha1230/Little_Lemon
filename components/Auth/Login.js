import React, { useState, useRef } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Animated } from 'react-native';
import { auth } from 'C:/Users/Talha PC/FirstProject/FirebaseConfigs.ts'; // Import the auth instance from your Firebase setup file
import { signInWithEmailAndPassword } from 'firebase/auth';

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
    position: 'absolute',
    bottom: 20,
    backgroundColor: 'green',
    padding: 10,
    borderRadius: 5,
  },
  successText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default Login;
