import { initializeApp } from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import { getAnalytics } from 'firebase/analytics';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

// Your Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAWP_rhrSc_LCEt8zpMLlvwFTGuzMHW5gk",
  authDomain: "little-lemon-b5b2d.firebaseapp.com",
  projectId: "little-lemon-b5b2d",
  storageBucket: "little-lemon-b5b2d.appspot.com",
  messagingSenderId: "633497567437",
  appId: "1:633497567437:web:0f2dd964076f26d5d06984",
  measurementId: "G-34C2PZCJ9C"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Export authentication and firestore instances
export const auth = getAuth(app);
export const db = getFirestore(app);

export { app, analytics };
