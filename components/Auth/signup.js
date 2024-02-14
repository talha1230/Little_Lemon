
import React, { useState, useRef } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, Modal, Animated, Dimensions } from 'react-native';

import { auth } from 'C:/Users/Talha PC/FirstProject/FirebaseConfigs.ts';
import { createUserWithEmailAndPassword } from 'firebase/auth'; // Import createUserWithEmailAndPassword

const Signup = ({ navigation }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState(null);
    const [loading, setLoading] = useState(false);
    const [successModalVisible, setSuccessModalVisible] = useState(false); 
    const windowWidth = Dimensions.get('window').width;
  
    const slideAnim = useRef(new Animated.Value(-windowWidth)).current; // Initial position outside the screen
  
    const handleSignup = () => {
      // Validate email and password
      if (!email) {
        setErrorMessage('Please enter your email');
        return;
      }
      if (!password) {
        setErrorMessage('Please enter your password');
        return;
      }
  
      setLoading(true);
      createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          if (userCredential.user) {
            console.log('User registered');
            // Animate success message
            Animated.timing(slideAnim, {
              toValue: 0, // Animate to the center of the screen
              duration: 500, // Animation duration
              useNativeDriver: true,
            }).start();
            // Set success modal visible after animation
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
        {/* Input fields and signup button */}
  
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
                  transform: [{ translateX: slideAnim }], // Apply animated translation
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
  