import React, { useState } from "react";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../../../firebaseConfig";
import STARFIELD from "../../../components/Starfield";
const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handlePasswordReset = async () => {
    try {
      await sendPasswordResetEmail(auth, email);
      setSuccess("Password reset link sent to your email.");
      setError(""); // Clear previous errors
    } catch (error) {
      setError("Failed to send reset link. Please check the email.");
      setSuccess(""); // Clear previous success messages
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <STARFIELD className="z-0" />
      <div className="backdrop-blur-lg bg-white/10 shadow-lg rounded-lg px-8 py-6 w-full max-w-md z-10">
        <h2 className="text-2xl font-bold text-white text-center mb-6">
          Forgot Password
        </h2>
        
        <div className="mb-4">
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2 text-white bg-transparent border border-white/50 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder:text-white/70"
          />
        </div>

        <button
          onClick={handlePasswordReset}
          className="w-full py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-bold rounded-md hover:from-purple-600 hover:to-blue-500 transition-colors"
        >
          Send Reset Link
        </button>

        {success && <p className="mt-4 text-sm text-green-400 text-center">{success}</p>}
        {error && <p className="mt-4 text-sm text-red-400 text-center">{error}</p>}

        <p className="mt-6 text-sm text-center text-white/70">
          Remembered your password?{" "}
          <a href="/login/auth" className="text-blue-400 hover:text-blue-500">
            Go back to login
          </a>
        </p>
      </div>
    </div>
  );
};

export default ForgotPassword;
