// threadsFirebaseConfig.js
import { initializeApp, getApps, getApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getDatabase } from "firebase/database";
const threadsConfig = {
  apiKey: process.env.REACT_APP_THREADS_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_THREADS_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_THREADS_FIREBASE_DATABASE_URL,
  projectId: process.env.REACT_APP_THREADS_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_THREADS_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_THREADS_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_THREADS_FIREBASE_APP_ID,
  measurementId: process.env.REACT_APP_THREADS_FIREBASE_MEASUREMENT_ID
};

// Check if the "threads" app has already been initialized
const threadsApp = !getApps().some(app => app.name === "threads")
  ? initializeApp(threadsConfig, "threads")
  : getApp("threads");

const analytics = getAnalytics(threadsApp);
const auth = getAuth(threadsApp);
const db = getFirestore(threadsApp);
const storage = getStorage(threadsApp);
const database = getDatabase(threadsApp);
export { threadsApp, analytics, auth, db, storage, database, GoogleAuthProvider };
