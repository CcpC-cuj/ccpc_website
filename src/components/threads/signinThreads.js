import React from "react";
import { useNavigate } from "react-router-dom";
import { auth, GoogleAuthProvider, db } from "../../threadsFirebaseConfig";
import { FaGoogle } from "react-icons/fa";
import { signInWithPopup } from "firebase/auth";
import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";

const SignIn = ({ redirectPath = "/threads" }) => { // Default to home if no path is provided
  const navigate = useNavigate();

  const handleGoogleSignIn = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      // Firestore: Store profile details
      const userDocRef = doc(db, "users", user.uid);
      const userDocSnap = await getDoc(userDocRef);
      const profileData = {
        displayName: user.displayName,
        email: user.email,
        photoURL: user.photoURL,
        lastLogin: new Date().toISOString(),
        is_members: userDocSnap.exists() ? userDocSnap.data().is_members : false,
      };

      // Store user data in Firestore
      await setDoc(userDocRef, profileData, { merge: true });

      console.log("Sign-in successful, redirecting to", redirectPath);
      navigate(redirectPath); // Redirect based on where the user signed in from
    } catch (error) {
      console.error("Error during sign-in ❌", error);
    }
  };

  return (
    <div className="flex items-center justify-center">
      <div className="px-8 py-6 w-full max-w-md z-10">
        <button
          onClick={handleGoogleSignIn}
          className="w-full py-2 px-2 bg-gradient-to-r font-ssans from-red-500 to-yellow-500 font-radley text-white font-bold rounded-md flex items-center justify-center"
        >
          <FaGoogle className="mr-2" />
          Continue with Google
        </button>
      </div>
    </div>
  );
};

export default SignIn;
