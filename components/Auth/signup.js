import React, { useState } from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { Input, Button } from 'react-native-elements';
import { auth } from 'C:/Users/Talha PC/FirstProject/FirebaseConfigs.ts';

const Signup = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSignup = () => {
    setLoading(true);
    auth.createUserWithEmailAndPassword(email, password)
      .then((userCredential) => {
        if (userCredential.user) {
          console.log('User registered');
        }
      })
      .catch((error) => {
        setErrorMessage(error.message);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <View style={styles.container}>
      <Input
        placeholder="Email"
        leftIcon={{ type: 'font-awesome', name: 'envelope' }}
        onChangeText={(value) => setEmail(value)}
        value={email}
        autoCapitalize="none"
        keyboardType="email-address"
        containerStyle={styles.inputContainer}
        inputStyle={styles.input}
      />
      <Input
        placeholder="Password"
        leftIcon={{ type: 'font-awesome', name: 'lock' }}
        onChangeText={(value) => setPassword(value)}
        value={password}
        secureTextEntry
        containerStyle={styles.inputContainer}
        inputStyle={styles.input}
      />
      {errorMessage && <Text style={styles.errorMessage}>{errorMessage}</Text>}
      <Button
        title="Sign Up"
        onPress={handleSignup}
        loading={loading}
        buttonStyle={styles.signupButton}
        disabled={loading}
      />
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
    paddingHorizontal: 20,
    backgroundColor: '#fff', // Set background color
  },
  inputContainer: {
    marginBottom: 20,
  },
  input: {
    fontSize: 16,
  },
  errorMessage: {
    color: 'red',
    marginBottom: 10,
  },
  signupButton: {
    width: '100%',
    backgroundColor: '#007bff',
    borderRadius: 5,
    marginVertical: 10, // Add margin vertical
  },
  backButton: {
    width: '100%',
    backgroundColor: '#6c757d', // Change background color
    borderRadius: 5,
    paddingVertical: 15, // Increase padding vertical
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center', // Center text
  },
});

export default Signup;
