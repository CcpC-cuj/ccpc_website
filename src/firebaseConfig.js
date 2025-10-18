// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"; // For Firebase Authentication
// ...existing code...
import { getDatabase } from "firebase/database"; // For Firebase Realtime Database
import { getStorage } from "firebase/storage"; // Import Firebase Storage

// Your web app's Firebase configuration (read from env when available)
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
  measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// ...existing code...
const auth = getAuth(app); // Initialize Firebase Authentication
const database = getDatabase(app); // Initialize Firebase Realtime Database
const storage = getStorage(app); // Initialize Firebase Storage

// Export the necessary Firebase instances
export { auth, database, storage }; // Export storage for use in other components
