import React, { useState, useRef } from 'react';
import { View, StyleSheet, Text, Modal, Animated, Dimensions, TextInput, TouchableOpacity } from 'react-native';
import { auth } from 'C:/Users/Talha PC/FirstProject/FirebaseConfigs.ts';
import { createUserWithEmailAndPassword } from 'firebase/auth'; 

const Signup = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [errorMessage, setErrorMessage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [successModalVisible, setSuccessModalVisible] = useState(false); 
  const windowWidth = Dimensions.get('window').width;
  const slideAnim = useRef(new Animated.Value(-windowWidth)).current;

  const handleSignup = () => {
    // Validate email, password, name, and age
    if (!email || !password || !name || !age) {
      setErrorMessage('Please fill in all fields');
      return;
    }

    setLoading(true);
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        if (userCredential.user) {
          console.log('User registered');
          Animated.timing(slideAnim, {
            toValue: 0,
            duration: 500,
            useNativeDriver: true,
          }).start();
          setTimeout(() => {
            setSuccessModalVisible(true);
          }, 500);
        }
      })
      .catch((error) => {
        console.error(error);
        setErrorMessage(error.message);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <View style={styles.container}>
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
      <TextInput
        style={styles.input}
        placeholder="Name"
        onChangeText={setName}
        value={name}
      />
      <TextInput
        style={styles.input}
        placeholder="Age"
        onChangeText={setAge}
        value={age}
        keyboardType="numeric"
      />
      <TouchableOpacity
        style={styles.signupButton}
        onPress={handleSignup}
        disabled={loading}
      >
        <Text style={styles.buttonText}>{loading ? 'Signing up...' : 'Sign Up'}</Text>
      </TouchableOpacity>

      {/* Success Modal */}
      <Modal
        visible={successModalVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setSuccessModalVisible(false)}
      >
        <View style={styles.modalBackground}>
          <Animated.View
            style={[
              styles.modalContent,
              {
                transform: [{ translateX: slideAnim }],
              },
            ]}
          >
            <Text style={styles.modalText}>Signup successful!</Text>
            <TouchableOpacity onPress={() => setSuccessModalVisible(false)}>
              <Text style={styles.closeButton}>Close</Text>
            </TouchableOpacity>
          </Animated.View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    backgroundColor: '#fff',
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
  signupButton: {
    width: '100%',
    backgroundColor: '#007bff',
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
  modalBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
  },
  modalText: {
    fontSize: 18,
    marginBottom: 10,
  },
  closeButton: {
    fontSize: 16,
    color: '#007bff',
  },
});

export default Signup;
