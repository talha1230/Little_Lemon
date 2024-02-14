import React, { createContext, useState, useEffect } from 'react';
import { auth } from 'C:/Users/Talha PC/FirstProject/FirebaseConfigs'; // Import your Firebase auth object
import { onAuthStateChanged } from 'firebase/auth'; // Import onAuthStateChanged
import { doc, getDoc } from 'firebase/firestore'; // Import Firestore functions
import { db } from 'C:/Users/Talha PC/FirstProject/FirebaseConfigs'; // Import your Firestore db object

export const AuthContext = createContext(); // Create AuthContext

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState({
    email: '',
    name: '',
    age: '',
    // Add other fields as needed
  });

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        // User is signed in, fetch additional user data from Firestore
        const userDoc = await getDoc(doc(db, 'users', user.uid));
        if (userDoc.exists()) {
          setCurrentUser({
            ...currentUser,
            email: user.email,
            name: userDoc.data().name,
            age: userDoc.data().age,
            // Add other fields as needed
          });
        }
      } else {
        // User is signed out, reset currentUser
        setCurrentUser({
          email: '',
          name: '',
          age: '',
          // Add other fields as needed
        });
      }
    });

    return unsubscribe; // Cleanup function
  }, []);

  return (
    <AuthContext.Provider value={{ currentUser, setCurrentUser }}>
      {children}
    </AuthContext.Provider>
  );
};