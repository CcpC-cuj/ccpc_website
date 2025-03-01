import React from "react";
import { useNavigate } from "react-router-dom";
import { auth, GoogleAuthProvider, db } from "../../threadsFirebaseConfig";
import { FaGoogle } from "react-icons/fa";
import { signInWithPopup } from "firebase/auth";
import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";

const SignIn = () => {
  const navigate = useNavigate();

  const handleGoogleSignIn = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      
      // Firestore: Store profile details including membership status.
      const userDocRef = doc(db, "users", user.uid);
      const userDocSnap = await getDoc(userDocRef);
      const profileData = {
        displayName: user.displayName,
        email: user.email,
        photoURL: user.photoURL,
        lastLogin: new Date().toISOString(),
        // Set default membership status to false if it doesn't exist.
        is_members: false,
      };

      if (!userDocSnap.exists()) {
        // Create new document with default is_members.
        await setDoc(userDocRef, profileData);
      } else {
        // If document exists, keep the existing membership status.
        const existingData = userDocSnap.data();
        const newData = {
          displayName: user.displayName,
          email: user.email,
          photoURL: user.photoURL,
          lastLogin: new Date().toISOString(),
          is_members: existingData.is_members !== undefined ? existingData.is_members : false,
        };
        await updateDoc(userDocRef, newData);
      }
      
      console.log("Sign-in successful, redirecting to /threads/home");
      navigate("/threads/home");      
    } catch (error) {
      console.error("Error during sign-in", error);
    }
  };

  return (
    <div className="flex items-center justify-center">
      <div className="px-8 py-6 w-full max-w-md z-10">
        <button
          onClick={handleGoogleSignIn}
          className="w-full py-2 px-2 bg-gradient-to-r from-red-500 to-yellow-500 font-radley text-white font-bold rounded-md flex items-center justify-center"
        >
          <FaGoogle className="mr-2" />
          Continue with Google
        </button>
      </div>
    </div>
  );
};

export default SignIn;
