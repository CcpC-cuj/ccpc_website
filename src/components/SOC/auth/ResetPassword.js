import React, { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { auth } from "../../../firebaseConfig";
import {
  verifyPasswordResetCode,
  confirmPasswordReset,
} from "firebase/auth";
import STARFIELD from "../../../components/Starfield";

const ResetPassword = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(true);

  const oobCode = searchParams.get("oobCode");

  useEffect(() => {
    if (!oobCode) {
      setError("Invalid or missing reset code.");
      setLoading(false);
      return;
    }

    // Verify the reset code first
    verifyPasswordResetCode(auth, oobCode)
      .then((userEmail) => {
        setEmail(userEmail);
        setLoading(false);
      })
      .catch(() => {
        setError("Invalid or expired reset link.");
        setLoading(false);
      });
  }, [oobCode]);

  const handleResetPassword = async () => {
    if (newPassword !== confirmNewPassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
      await confirmPasswordReset(auth, oobCode, newPassword);
      setSuccess("Password reset successful! Redirecting to login...");
      setError("");

      // Redirect after short delay
      setTimeout(() => navigate("/login/auth"), 3000);
    } catch (err) {
      setError("Failed to reset password. The link may have expired.");
      setSuccess("");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <STARFIELD className="z-0" />
      <div className="backdrop-blur-lg bg-white/10 shadow-lg rounded-lg px-8 py-6 w-full max-w-md z-10">
        <h2 className="text-2xl font-bold text-white text-center mb-6">
          Reset Password
        </h2>

        {loading ? (
          <p className="text-white text-center">Verifying reset link...</p>
        ) : error ? (
          <p className="text-red-400 text-center">{error}</p>
        ) : (
          <>
            <p className="text-white/80 text-sm text-center mb-4">
              Reset password for <strong>{email}</strong>
            </p>

            <input
              type="password"
              placeholder="New password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="w-full px-4 py-2 mb-4 text-white bg-transparent border border-white/50 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder:text-white/70"
            />

            <input
              type="password"
              placeholder="Confirm new password"
              value={confirmNewPassword}
              onChange={(e) => setConfirmNewPassword(e.target.value)}
              className="w-full px-4 py-2 mb-4 text-white bg-transparent border border-white/50 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder:text-white/70"
            />

            <button
              onClick={handleResetPassword}
              className="w-full py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-bold rounded-md hover:from-purple-600 hover:to-blue-500 transition-colors"
            >
              Reset Password
            </button>

            {success && (
              <p className="mt-4 text-sm text-green-400 text-center">
                {success}
              </p>
            )}
            {error && (
              <p className="mt-4 text-sm text-red-400 text-center">{error}</p>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default ResetPassword;
