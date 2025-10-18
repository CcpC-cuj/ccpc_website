import React, { useState, useEffect } from "react";
import { storage, auth } from "../../firebaseConfig";
import { ref, uploadBytes } from "firebase/storage";
import {
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";
import Navbar from "./Navbar";

const allowedEmails = [
  "ccpc.cuj@gmail.com",
  "krish.22190503027@cuj.ac.in",
  "diwakar.23190503026@cuj.ac.in",
  "sandeep.22190503052@cuj.ac.in",
].map((email) => email.toLowerCase());

export default function GalleryUpload() {
  const [file, setFile] = useState(null);
  const [firebaseUser, setFirebaseUser] = useState(null);
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [customName, setCustomName] = useState("");
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);
  const [authEmail, setAuthEmail] = useState("");
  const [authPassword, setAuthPassword] = useState("");
  const [authLoading, setAuthLoading] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setFirebaseUser(user);
      if (user?.email) {
        const isAllowed = allowedEmails.includes(user.email.toLowerCase());
        setIsAuthorized(isAllowed);
        if (!isAllowed) {
          setMessage("You are signed in but not authorized to upload gallery images.");
          setIsError(true);
        } else {
          setMessage("");
          setIsError(false);
        }
      } else {
        setIsAuthorized(false);
      }
    });

    return () => unsubscribe();
  }, []);

  const sanitizeFileName = (name) =>
    name
      .trim()
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-");

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile && selectedFile.type.startsWith("image/")) {
      setFile(selectedFile);
      const defaultName = selectedFile.name.replace(/\.[^/.]+$/, "");
      setCustomName(defaultName);
      setMessage("");
      setIsError(false);
    } else {
      setMessage("Please select a valid image file.");
      setIsError(true);
      setFile(null);
      setCustomName("");
    }
  };

  const handleAuthSubmit = async (e) => {
    e.preventDefault();
    setAuthLoading(true);
    setMessage("");
    setIsError(false);

    try {
      const credential = await signInWithEmailAndPassword(
        auth,
        authEmail.trim(),
        authPassword
      );

      const email = credential.user.email?.toLowerCase();
      const allowed = email ? allowedEmails.includes(email) : false;

      if (!allowed) {
        setIsAuthorized(false);
        setMessage("Signed in, but you do not have permission to upload.");
        setIsError(true);
        await signOut(auth);
      } else {
        setIsAuthorized(true);
        setMessage("Signed in. You can upload images now.");
        setIsError(false);
        setAuthEmail("");
        setAuthPassword("");
      }
    } catch (error) {
      console.error("Firebase auth error:", error);
      setMessage(error.message || "Authentication failed. Please try again.");
      setIsError(true);
    } finally {
      setAuthLoading(false);
    }
  };

  const handleSignOut = async () => {
    await signOut(auth);
    setIsAuthorized(false);
    setFirebaseUser(null);
    setFile(null);
    setCustomName("");
    const input = document.getElementById("fileInput");
    if (input) {
      input.value = "";
    }
    setMessage("Signed out successfully.");
    setIsError(false);
  };

  const handleUpload = async () => {
    if (!file) {
      setMessage("Please select an image to upload.");
      setIsError(true);
      return;
    }

    if (!isAuthorized || !firebaseUser) {
      setMessage("You must sign in with an authorized account to upload images.");
      setIsError(true);
      return;
    }

    if (!customName.trim()) {
      setMessage("Please provide a name for this image before uploading.");
      setIsError(true);
      return;
    }

    setUploading(true);
    setMessage("");
    setIsError(false);

    try {
      const extension = file.name.split(".").pop();
      const sanitizedName = sanitizeFileName(customName);

      if (!sanitizedName) {
        setMessage("Image name must include letters or numbers.");
        setIsError(true);
        return;
      }

      const storageRef = ref(
        storage,
        `gallery/${sanitizedName}-${Date.now()}.${extension}`
      );

      await uploadBytes(storageRef, file, {
        customMetadata: {
          alt: customName.trim(),
          uploadedBy: firebaseUser.email,
        },
      });

      setMessage("Image uploaded successfully!");
      setIsError(false);
      setFile(null);
      setCustomName("");
      // Reset file input
      const input = document.getElementById("fileInput");
      if (input) {
        input.value = "";
      }
    } catch (error) {
      console.error("Upload error:", error);
      setMessage("Failed to upload image. Please try again.");
      setIsError(true);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <Navbar />
      <div className="p-8">
        <h1 className="text-3xl font-bold mb-6">Gallery Management</h1>
        <div className="bg-gray-800 p-6 rounded-xl shadow-lg max-w-md space-y-6">
          {firebaseUser && (
            <div className="rounded border border-white/10 bg-gray-900/40 p-4">
              <p className="text-sm text-gray-300">
                Signed in as <span className="font-semibold">{firebaseUser.email}</span>
              </p>
              <p
                className={`text-sm mt-2 ${
                  isAuthorized ? "text-green-400" : "text-red-400"
                }`}
              >
                {isAuthorized
                  ? "You have permission to upload gallery images."
                  : "You are not on the authorized list."}
              </p>
              <button
                onClick={handleSignOut}
                className="mt-3 text-sm text-indigo-300 hover:text-indigo-100"
              >
                Sign out
              </button>
            </div>
          )}

          <div>
            <h2 className="text-xl font-semibold mb-4">Upload Image</h2>
          <input
            id="fileInput"
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="mb-4 w-full text-gray-300"
          />
          <label className="block text-sm text-gray-400 mb-1" htmlFor="customName">
            Rename image (used as alt text)
          </label>
          <input
            id="customName"
            type="text"
            value={customName}
            onChange={(e) => setCustomName(e.target.value)}
            placeholder="Enter descriptive image name"
            className="mb-4 w-full rounded bg-gray-700 px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <button
            onClick={handleUpload}
            disabled={
              uploading ||
              !file ||
              !customName.trim() ||
              !isAuthorized ||
              !firebaseUser
            }
            className={`w-full py-2 px-4 rounded font-semibold transition-colors ${
              uploading ||
              !file ||
              !customName.trim() ||
              !isAuthorized ||
              !firebaseUser
                ? "bg-gray-600 cursor-not-allowed"
                : "bg-indigo-600 hover:bg-indigo-700"
            }`}
          >
            {uploading ? "Uploading..." : "Upload Image"}
          </button>
          {message && (
            <p className={`mt-4 text-center ${isError ? "text-red-400" : "text-green-400"}`}>
              {message}
            </p>
          )}
          </div>
        </div>
      </div>

      {!isAuthorized && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
          <div className="w-full max-w-md rounded-2xl bg-gray-900/95 p-8 shadow-2xl border border-white/10">
            <h2 className="text-2xl font-semibold text-white mb-6 text-center">
              Sign in to Manage Gallery
            </h2>
            <form onSubmit={handleAuthSubmit} className="space-y-4">
              <div>
                <label className="block text-sm text-gray-400 mb-1" htmlFor="authEmail">
                  Email
                </label>
                <input
                  id="authEmail"
                  type="email"
                  value={authEmail}
                  onChange={(e) => setAuthEmail(e.target.value)}
                  required
                  className="w-full rounded bg-gray-800 px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-1" htmlFor="authPassword">
                  Password
                </label>
                <input
                  id="authPassword"
                  type="password"
                  value={authPassword}
                  onChange={(e) => setAuthPassword(e.target.value)}
                  required
                  className="w-full rounded bg-gray-800 px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
              <button
                type="submit"
                disabled={authLoading}
                className={`w-full py-2 px-4 rounded font-semibold transition-colors ${
                  authLoading
                    ? "bg-gray-700 cursor-not-allowed"
                    : "bg-indigo-600 hover:bg-indigo-700"
                }`}
              >
                {authLoading ? "Signing in..." : "Sign in"}
              </button>
            </form>
            <p className="mt-4 text-xs text-gray-400 text-center">
              Only approved CCPC admin accounts can upload gallery images.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}