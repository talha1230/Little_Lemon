import * as React from 'react';
import { View, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { AuthProvider } from './components/Auth/AuthContext'; // Import AuthProvider

import LittleLemonHeader from './components/LittleLemonHeader';
import LittleLemonFooter from './components/LittleLemonFooter';
import Welcome from './components/Welcome';
import MenuItems from './components/MenuItems';
import Login from './components/Auth/Login';
import Signup from './components/Auth/signup';
import ProfileView from './components/Profile/ProfileView';

const Stack = createStackNavigator();

function MainScreen() {
  return (
    <View style={styles.container}>
      <LittleLemonHeader />
      <Welcome />
      <MenuItems />
      <LittleLemonFooter />
      <ProfileView />
    </View>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Main" component={MainScreen} />
          <Stack.Screen
            name="Login"
            component={Login}
            options={{ headerShown: false, gestureEnabled: false }}
          />
          <Stack.Screen
            name="Signup"
            component={Signup}
            options={{ headerShown: false, gestureEnabled: false }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </AuthProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    backgroundColor: '#fffdd0', // light lemon color
    padding: 20,
  },
});