// threadsFirebaseConfig.js
import { initializeApp, getApps, getApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getDatabase } from "firebase/database";
const threadsConfig = {
  apiKey: "AIzaSyAOh59mtmluoq1hoqM3ATJqTmrh7V3ctrQ",
  authDomain: "ccpccuj.firebaseapp.com",
  databaseURL: "https://ccpccuj-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "ccpccuj",
  storageBucket: "ccpccuj.appspot.com",
  messagingSenderId: "1046645083672",
  appId: "1:1046645083672:web:8c74c665b083b416fbfd6d",
  measurementId: "G-K60BK1H1ZH"
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
