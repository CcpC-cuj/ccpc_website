// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"; // For Firebase Authentication
import { getAnalytics } from "firebase/analytics";
import { getDatabase } from "firebase/database"; // For Firebase Realtime Database
import { getStorage } from "firebase/storage"; // Import Firebase Storage

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA1965fWrtU_011cnp-uwel-d8wWqpLj5A",
  authDomain: "soc-ccpc-cuj.firebaseapp.com",
  projectId: "soc-ccpc-cuj",
  storageBucket: "soc-ccpc-cuj.appspot.com",
  messagingSenderId: "742957309273",
  appId: "1:742957309273:web:c095865e3a9c58ea97c048",
  measurementId: "G-WVHPZM6S6Y"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app); // Initialize Firebase Authentication
const database = getDatabase(app); // Initialize Firebase Realtime Database
const storage = getStorage(app); // Initialize Firebase Storage

// Export the necessary Firebase instances
export { auth, database, storage }; // Export storage for use in other components
