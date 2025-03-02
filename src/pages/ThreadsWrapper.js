import React, { useEffect, useState } from "react";
import { auth } from "../threadsFirebaseConfig"; // Adjust path if needed
import { onAuthStateChanged } from "firebase/auth";
import Threads from "../components/threads/threads"; // Landing Page (for unauthenticated users)
import ThreadsHome from "../components/threads/threadshome"; // Main Threads Page (for authenticated users)

const ThreadsWrapper = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false); // Stop loading once we determine auth state
    });

    return () => unsubscribe(); // Cleanup listener on unmount
  }, []);

  if (loading) {
    return <p className="text-center text-white">Loading...</p>;
  }

  return user ? <ThreadsHome /> : <Threads />;
};

export default ThreadsWrapper;
