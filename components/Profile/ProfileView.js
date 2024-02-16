import React, { useContext, useEffect } from 'react';
import { View, Text, Button, StyleSheet, TouchableOpacity } from 'react-native';
import { AuthContext } from 'C:/Users/Talha PC/FirstProject/components/Auth/AuthContext.js';
import { signOut } from 'firebase/auth';
import { auth } from 'C:/Users/Talha PC/FirstProject/FirebaseConfigs';
import { useSharedValue, withTiming, useAnimatedStyle, Easing } from 'react-native-reanimated';

const ProfileView = ({ navigation }) => {
  const { currentUser } = useContext(AuthContext);

  const handleSignOut = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
        <Text style={styles.backButtonText}>Back</Text>
      </TouchableOpacity>
      <Text style={styles.title}>Profile</Text>
      <View style={styles.userInfoContainer}>
        <Text style={styles.label}>Email:</Text>
        <Text style={styles.info}>{currentUser.email}</Text>
      </View>
      <View style={styles.userInfoContainer}>
        <Text style={styles.label}>Name:</Text>
        <Text style={styles.info}>{currentUser.name}</Text>
      </View>
      <View style={styles.userInfoContainer}>
        <Text style={styles.label}>Age:</Text>
        <Text style={styles.info}>{currentUser.age}</Text>
      </View>
      <Button title="Sign Out" onPress={handleSignOut} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
  },
  userInfoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  label: {
    fontSize: 18,
    fontWeight: 'bold',
    marginRight: 10,
    color: '#555',
  },
  info: {
    fontSize: 18,
    color: '#555',
  },
  backButton: {
    position: 'absolute',
    top: 20,
    left: 20,
    zIndex: 1,
  },
  backButtonText: {
    fontSize: 18,
    color: '#007bff', // Blue color
  },
});

export default ProfileView;
