import React, { useContext } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { AuthContext } from 'C:/Users/Talha PC/FirstProject/components/Auth/AuthContext.js'; // Import your AuthContext
import { signOut } from 'firebase/auth'; // Import signOut
import { auth } from 'C:/Users/Talha PC/FirstProject/FirebaseConfigs'; // Import your Firebase auth object

const ProfileView = () => {
  const { currentUser } = useContext(AuthContext); // Access user data from AuthContext

  const handleSignOut = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Profile</Text>
      <Text style={styles.info}>Email: {currentUser.email}</Text>
      <Text style={styles.info}>Name: {currentUser.name}</Text>
      <Text style={styles.info}>Age: {currentUser.age}</Text>
      {/* Add more user data fields as needed */}
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#fff',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    info: {
        fontSize: 18,
        marginBottom: 10,
    },
});

export default ProfileView;