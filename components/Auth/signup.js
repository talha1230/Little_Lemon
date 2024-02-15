import React, { useState, useRef } from 'react';
import { View, StyleSheet, Text, Modal, Animated, Dimensions, TextInput, TouchableOpacity, Image, ImageBackground } from 'react-native';
import { auth } from 'C:/Users/Talha PC/FirstProject/FirebaseConfigs.ts';
import { createUserWithEmailAndPassword } from 'firebase/auth'; 
import { MaterialIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { FontAwesome } from '@expo/vector-icons';
import LemonImage from'C:/Users/Talha PC/FirstProject/assets/SignupPhoto.jpg';
import { useFonts } from 'expo-font';
import AppLoading from 'expo-app-loading';

const Signup = ({ navigation }) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [successModalVisible, setSuccessModalVisible] = useState(false); 
  const windowWidth = Dimensions.get('window').width;
  const slideAnim = useRef(new Animated.Value(-windowWidth)).current;

  let [fontsLoaded] = useFonts({
    Lemonada: require('C:/Users/Talha PC/FirstProject/assets/fonts/Lemonada.ttf'),
  });

  const handleSignup = () => {
    if (!firstName || !lastName || !phoneNumber || !email || !password || !confirmPassword) {
      setErrorMessage('Please fill in all fields');
      return;
    }

    if (password !== confirmPassword) {
      setErrorMessage('Passwords do not match');
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

  if (!fontsLoaded) {
    return <AppLoading />;
  } else {
    return (
      <View style={styles.container}>
        <ImageBackground
          source={LemonImage}
          style={styles.image}
        >
          <View style={styles.textContainer}>
            <Text style={styles.text}>Want anything to be easy with LaslesVPN.</Text>
          </View>
        </ImageBackground>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <MaterialIcons name="arrow-back" size={24} color="#007bff" />
        </TouchableOpacity>
        <Text style={styles.title}>Sign Up</Text>
        <View style={styles.inputRow}>
          <TextInput
            style={styles.inputHalf}
            placeholder="First Name"
            onChangeText={setFirstName}
            value={firstName}
          />
          <TextInput
            style={styles.inputHalf}
            placeholder="Last Name"
            onChangeText={setLastName}
            value={lastName}
          />
        </View>
        <TextInput
          style={styles.input}
          placeholder="Phone Number"
          onChangeText={setPhoneNumber}
          value={phoneNumber}
          keyboardType="phone-pad"
        />
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
          placeholder="Confirm Password"
          onChangeText={setConfirmPassword}
          value={confirmPassword}
          secureTextEntry
        />
        <TouchableOpacity
          style={styles.signupButton}
          onPress={handleSignup}
          disabled={loading}
        >
          <Text style={styles.buttonText}>{loading ? 'Signing up...' : 'Sign Up'}</Text>
        </TouchableOpacity>
        <View style={styles.line}>
          <View style={styles.lineLeft} />
          <Text style={styles.lineText}>or</Text>
          <View style={styles.lineRight} />
        </View>
        <View style={styles.iconRow}>
          <TouchableOpacity style={styles.iconButton}>
            <FontAwesome name="google" size={24} color="#fff" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconButton}>
            <FontAwesome name="facebook" size={24} color="#fff" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconButton}>
            <FontAwesome name="twitter" size={24} color="#fff" />
          </TouchableOpacity>
        </View>
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
              <Image source={LemonImage} style={styles.lemonImage} />
              <Text style={styles.modalText}>Signup successful!</Text>
              <TouchableOpacity onPress={() => setSuccessModalVisible(false)}>
                <Text style={styles.closeButton}>Close</Text>
              </TouchableOpacity>
            </Animated.View>
          </View>
        </Modal>
      </View>
    );
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: 300,
    height: 200,
    borderRadius: 15,
    overflow: 'hidden',
  },
  textContainer: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
  },
  text: {
    fontSize: 24,
    color: '#fff',
    fontWeight: 'bold',
  },
  backButton: {
    position: 'absolute',
    top: 40,
    left: 20,
  },
  title: {
    fontSize: 32,
    fontFamily: 'Poppins',
    color: '#333',
    marginBottom: 20,
  },
  inputRow: {
    width: 300,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  input: {
    width: 300,
    height: 40,
    backgroundColor: '#fff',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 10,
    margin: 10,
  },
  inputHalf: {
    width: 140,
    height: 40,
    backgroundColor: '#fff',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 10,
    margin: 10,
  },
  signupButton: {
    width: 300,
    height: 40,
    backgroundColor: '#007bff',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#007bff',
    alignItems: 'center',
    justifyContent: 'center',
    margin: 10,
  },
  buttonText: {
    fontSize: 18,
    fontFamily: 'Poppins',
    color: '#fff',
  },
  line: {
    width: 300,
    flexDirection: 'row',
    alignItems: 'center',
    margin: 10,
  },
  lineLeft: {
    flex: 1,
    height: 1,
    backgroundColor: '#ddd',
    marginHorizontal: 10,
  },
  lineText: {
    fontSize: 16,
    fontFamily: 'Poppins',
    color: '#333',
  },
  lineRight: {
    flex: 1,
    height: 1,
    backgroundColor: '#ddd',
    marginHorizontal: 10,
  },
  iconRow: {
    width: 300,
    flexDirection: 'row',
    justifyContent: 'space-around',
    margin: 10,
  },
  iconButton: {
    width: 40,
    height: 40,
    backgroundColor: '#007bff',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#007bff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalBackground: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalContent: {
    width: 300,
    height: 300,
    backgroundColor: '#fff',
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  lemonImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  modalText: {
    fontSize: 24,
    fontFamily: 'Poppins',
    color: '#007bff',
    margin: 10,
  },
  closeButton: {
    fontSize: 18,
    fontFamily: 'Poppins',
    color: '#fff',
    backgroundColor: '#007bff',
    borderRadius: 10,
    padding: 10,
  },
});

export default Signup;
