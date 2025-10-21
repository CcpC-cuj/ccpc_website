import React, { useState, useEffect } from "react";
import { auth, storage } from "../../firebaseConfig";
import { ref as firebaseRef, uploadBytes, listAll, getBlob } from "firebase/storage";
import { supabase } from '../../supabaseClient';
import {
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";
import heic2any from "heic2any";
import Navbar from "./Navbar";

const allowedEmails = [
  "ccpc.cuj@gmail.com",
  "krish.22190503027@cuj.ac.in",
].map((email) => email.toLowerCase());

// Utility function to sanitize file names
const sanitizeFileName = (name) => {
  return name.replace(/[^a-zA-Z0-9\-_.]/g, '_').substring(0, 100);
};

export default function GalleryUpload() {
  const [files, setFiles] = useState([]); // Array of files
  const [previews, setPreviews] = useState([]); // Array of preview URLs
  const [firebaseUser, setFirebaseUser] = useState(null);
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [customNames, setCustomNames] = useState([]); // Array of custom names
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState([]); // Array of progress per file
  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);
  const [authEmail, setAuthEmail] = useState("");
  const [authPassword, setAuthPassword] = useState("");
  const [authLoading, setAuthLoading] = useState(false);
  // Admin: Compare and migrate gallery images between Firebase and Supabase
  const [syncStatus, setSyncStatus] = useState(null);
  const [syncLoading, setSyncLoading] = useState(false);
  // Compress existing images
  const [compressStatus, setCompressStatus] = useState(null);
  const [compressLoading, setCompressLoading] = useState(false);

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

  const checkAndSyncGallery = async () => {
    setSyncLoading(true);
    setSyncStatus(null);
    try {
      // List Firebase images
      const firebaseListRef = firebaseRef(storage, 'gallery');
      const firebaseRes = await listAll(firebaseListRef);
      const firebaseNames = firebaseRes.items.map(item => item.name);
      // List Supabase images
      const { data: supabaseData, error: supabaseError } = await supabase.storage.from('CcpC').list('gallery', { limit: 1000 });
      if (supabaseError) throw supabaseError;
      const supabaseNames = (supabaseData || []).map(item => item.name);
      // Find missing in Supabase
      const missingInSupabase = firebaseNames.filter(name => !supabaseNames.includes(name));
      // Find missing in Firebase
      const missingInFirebase = supabaseNames.filter(name => !firebaseNames.includes(name));
      // Migrate missing images from Firebase to Supabase
      let migrated = 0;
      for (const name of missingInSupabase) {
        try {
          const itemRef = firebaseRef(storage, `gallery/${name}`);
          const blob = await getBlob(itemRef);
          const { error: uploadError } = await supabase.storage.from('CcpC').upload(`gallery/${name}`, blob, { upsert: true });
          if (!uploadError) migrated++;
        } catch (err) {
          // Ignore individual errors, log if needed
        }
      }
      setSyncStatus({
        firebaseCount: firebaseNames.length,
        supabaseCount: supabaseNames.length,
        missingInSupabase,
        missingInFirebase,
        migrated
      });
    } catch (err) {
      setSyncStatus({ error: err.message || 'Sync failed.' });
    }
    setSyncLoading(false);
  };
  const handleFileChange = async (e) => {
    const selectedFiles = Array.from(e.target.files).filter(f => f.type.startsWith("image/"));
    if (selectedFiles.length > 0) {
      setFiles(selectedFiles);
      setCustomNames(selectedFiles.map(f => f.name.replace(/\.[^/.]+$/, "")));
      setMessage("");
      setIsError(false);
      // Generate previews, convert HEIC/HEIF to JPEG for preview
      const previewPromises = selectedFiles.map(async (file) => {
        const extension = file.name.split('.').pop().toLowerCase();
        if (extension === "heic" || extension === "heif" || file.type === "image/heic" || file.type === "image/heif") {
          try {
            const convertedBlob = await heic2any({
              blob: file,
              toType: "image/jpeg",
              quality: 0.8
            });
            return URL.createObjectURL(convertedBlob);
          } catch (err) {
            return ""; // fallback: no preview
          }
        } else {
          return URL.createObjectURL(file);
        }
      });
      const previewUrls = await Promise.all(previewPromises);
      setPreviews(previewUrls);
    } else {
      setMessage("Please select valid image files.");
      setIsError(true);
      setFiles([]);
      setCustomNames([]);
      setPreviews([]);
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
  // removed obsolete setFile and setCustomName
    const input = document.getElementById("fileInput");
    if (input) {
      input.value = "";
    }
    setMessage("Signed out successfully.");
    setIsError(false);
  };

  const handleCustomNameChange = (idx, value) => {
    setCustomNames(prev => prev.map((n, i) => (i === idx ? value : n)));
  };

  const handleUpload = async () => {
    if (!files.length) {
      setMessage("Please select images to upload.");
      setIsError(true);
      return;
    }
    if (!isAuthorized || !firebaseUser) {
      setMessage("You must sign in with an authorized account to upload images.");
      setIsError(true);
      return;
    }
    if (customNames.some(name => !name.trim())) {
      setMessage("Please provide a name for each image before uploading.");
      setIsError(true);
      return;
    }
    setUploading(true);
    setMessage("");
    setIsError(false);
    setUploadProgress(Array(files.length).fill(0));
    let successCount = 0;
    for (let i = 0; i < files.length; i++) {
      let file = files[i];
      let fileToUpload = file;
      let extension = file.name.split(".").pop().toLowerCase();
      const sanitizedName = sanitizeFileName(customNames[i]);
      if (!sanitizedName) continue;
      // HEIC/HEIF conversion
      if (extension === "heic" || extension === "heif" || file.type === "image/heic" || file.type === "image/heif") {
        setMessage(`Converting HEIC image (${file.name}) to JPG...`);
        try {
          const convertedBlob = await heic2any({
            blob: file,
            toType: "image/jpeg",
            quality: 0.9
          });
          fileToUpload = convertedBlob;
          extension = "jpg";
        } catch (conversionError) {
          console.error("HEIC conversion error:", conversionError);
          setMessage(`Failed to convert HEIC image (${file.name}). Skipping.`);
          setIsError(true);
          continue;
        }
      }
      // Compress image to <= 400kb if needed
      if (fileToUpload.size > 400 * 1024) {
        try {
          const compressImage = async (blob, ext) => {
            return new Promise((resolve, reject) => {
              const img = new window.Image();
              img.onload = () => {
                const canvas = document.createElement('canvas');
                canvas.width = img.width;
                canvas.height = img.height;
                const ctx = canvas.getContext('2d');
                ctx.drawImage(img, 0, 0);
                let quality = 0.8;
                const tryCompress = () => {
                  canvas.toBlob((b) => {
                    if (b.size <= 400 * 1024 || quality < 0.3) {
                      resolve(b);
                    } else {
                      quality -= 0.1;
                      tryCompress();
                    }
                  }, ext === 'png' ? 'image/png' : 'image/jpeg', quality);
                };
                tryCompress();
              };
              img.onerror = reject;
              img.src = URL.createObjectURL(blob);
            });
          };
          fileToUpload = await compressImage(fileToUpload, extension);
        } catch (compressErr) {
          console.error('Compression failed:', compressErr);
        }
      }
      // Upload to Firebase Storage (gallery folder)
      const firebaseFileName = `gallery/${sanitizedName}-${Date.now()}.${extension}`;
      let firebaseSuccess = false;
      try {
        const firebaseStorageRef = firebaseRef(storage, firebaseFileName);
        await uploadBytes(firebaseStorageRef, fileToUpload);
        firebaseSuccess = true;
      } catch (firebaseError) {
        console.error(`Firebase upload failed for ${file.name}:`, firebaseError);
      }
      // Upload to Supabase Storage bucket 'CcpC' in 'gallery' folder
      const supabaseFileName = `gallery/${sanitizedName}-${Date.now()}.${extension}`;
      let supabaseSuccess = false;
      try {
        const { error: uploadError } = await supabase.storage.from('CcpC').upload(supabaseFileName, fileToUpload, { upsert: true });
        if (uploadError) throw uploadError;
        supabaseSuccess = true;
      } catch (error) {
        console.error(`Supabase upload failed for ${file.name}:`, error);
      }
      if (firebaseSuccess || supabaseSuccess) {
        successCount++;
        setUploadProgress(prev => prev.map((p, idx) => (idx === i ? 100 : p)));
      } else {
        setUploadProgress(prev => prev.map((p, idx) => (idx === i ? -1 : p)));
        setMessage(`Failed to upload ${file.name}.`);
        setIsError(true);
      }
    }
    setUploading(false);
    if (successCount === files.length) {
      setMessage("All images uploaded successfully!");
      setIsError(false);
      setFiles([]);
      setCustomNames([]);
      setUploadProgress([]);
      const input = document.getElementById("fileInput");
      if (input) input.value = "";
    } else if (successCount > 0) {
      setMessage(`${successCount} of ${files.length} images uploaded successfully.`);
      setIsError(false);
    }
  };

  const compressExistingImages = async () => {
    setCompressLoading(true);
    setCompressStatus(null);
    try {
      // List Firebase images
      const firebaseListRef = firebaseRef(storage, 'gallery');
      const firebaseRes = await listAll(firebaseListRef);
      const firebaseItems = firebaseRes.items;
      
      let compressed = 0;
      let total = firebaseItems.length;
      
      for (const item of firebaseItems) {
        try {
          const blob = await getBlob(item);
          let fileToUpload = blob;
          const extension = item.name.split('.').pop().toLowerCase();
          
          // Compress if > 400kb
          if (blob.size > 400 * 1024) {
            const compressImage = async (blob, ext) => {
              return new Promise((resolve, reject) => {
                const img = new window.Image();
                img.onload = () => {
                  const canvas = document.createElement('canvas');
                  canvas.width = img.width;
                  canvas.height = img.height;
                  const ctx = canvas.getContext('2d');
                  ctx.drawImage(img, 0, 0);
                  let quality = 0.8;
                  const tryCompress = () => {
                    canvas.toBlob((b) => {
                      if (b.size <= 400 * 1024 || quality < 0.3) {
                        resolve(b);
                      } else {
                        quality -= 0.1;
                        tryCompress();
                      }
                    }, ext === 'png' ? 'image/png' : 'image/jpeg', quality);
                  };
                  tryCompress();
                };
                img.onerror = reject;
                img.src = URL.createObjectURL(blob);
              });
            };
            fileToUpload = await compressImage(blob, extension);
            compressed++;
          }
          
          // Re-upload to Firebase (overwrite)
          await uploadBytes(item, fileToUpload);
          
          // Upload to Supabase (overwrite)
          const { error: uploadError } = await supabase.storage.from('CcpC').upload(`gallery/${item.name}`, fileToUpload, { upsert: true });
          if (uploadError) throw uploadError;
          
        } catch (err) {
          console.error(`Failed to compress ${item.name}:`, err);
        }
      }
      
      setCompressStatus({
        total,
        compressed,
        message: `Compressed ${compressed} of ${total} images to ≤400kb`
      });
    } catch (err) {
      setCompressStatus({ error: err.message || 'Compression failed.' });
    }
    setCompressLoading(false);
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
            multiple
            onChange={handleFileChange}
            className="mb-4 w-full text-gray-300"
          />
          {files.length > 0 && (
            <div className="mb-4 space-y-4">
              {files.map((file, idx) => (
                <div key={idx} className="bg-gray-700/40 p-2 rounded-lg flex flex-col items-center">
                  {previews[idx] ? (
                    <img
                      src={previews[idx]}
                      alt={customNames[idx] || file.name}
                      className="w-20 h-20 object-cover rounded shadow mb-2"
                    />
                  ) : (
                    <div className="w-20 h-20 flex items-center justify-center bg-gray-800 text-gray-400 rounded shadow mb-2 text-xs">No Preview</div>
                  )}
                  <input
                    type="text"
                    value={customNames[idx] || ''}
                    onChange={e => handleCustomNameChange(idx, e.target.value)}
                    placeholder="Image name"
                    className="w-full rounded bg-gray-800 px-2 py-1 text-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 mb-1"
                  />
                  <div className="w-full flex items-center">
                    <span className="text-xs text-gray-400 mr-2">{file.name.split('.').pop().toUpperCase()}</span>
                    <div className="flex-1">
                      {uploadProgress[idx] > 0 && uploadProgress[idx] < 100 && (
                        <div className="h-2 bg-gray-600 rounded">
                          <div className="bg-indigo-500 h-2 rounded" style={{ width: `${uploadProgress[idx]}%` }}></div>
                        </div>
                      )}
                      {uploadProgress[idx] === 100 && (
                        <div className="text-green-400 text-xs">Uploaded</div>
                      )}
                      {uploadProgress[idx] === -1 && (
                        <div className="text-red-400 text-xs">Failed</div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
          <button
            onClick={handleUpload}
            disabled={
              uploading ||
              !files.length ||
              customNames.some(name => !name.trim()) ||
              !isAuthorized ||
              !firebaseUser
            }
            className={`w-full py-2 px-4 rounded font-semibold transition-colors ${
              uploading ||
              !files.length ||
              customNames.some(name => !name.trim()) ||
              !isAuthorized ||
              !firebaseUser
                ? "bg-gray-600 cursor-not-allowed"
                : "bg-indigo-600 hover:bg-indigo-700"
            }`}
          >
            {uploading ? "Uploading..." : `Upload ${files.length > 1 ? files.length + ' Images' : 'Image'}`}
          </button>
          {message && (
            <p className={`mt-4 text-center ${isError ? "text-red-400" : "text-green-400"}`}>
              {message}
            </p>
          )}
          </div>
        </div>

        {/* Sync Gallery Section */}
        <div className="bg-gray-800 p-6 rounded-xl shadow-lg max-w-md space-y-6 mt-6">
          <h2 className="text-xl font-semibold mb-4">Sync Gallery Images</h2>
          <p className="text-sm text-gray-300 mb-4">
            Compare and migrate gallery images between Firebase and Supabase.
          </p>
          <button
            onClick={checkAndSyncGallery}
            disabled={syncLoading || !isAuthorized}
            className={`w-full py-2 px-4 rounded font-semibold transition-colors ${
              syncLoading || !isAuthorized
                ? "bg-gray-600 cursor-not-allowed"
                : "bg-green-600 hover:bg-green-700"
            }`}
          >
            {syncLoading ? "Syncing..." : "Check & Sync Gallery"}
          </button>
          {syncStatus && (
            <div className="mt-4 p-4 bg-gray-700 rounded">
              {syncStatus.error ? (
                <p className="text-red-400 text-sm">{syncStatus.error}</p>
              ) : (
                <div className="text-sm text-gray-300 space-y-1">
                  <p>Firebase: {syncStatus.firebaseCount} images</p>
                  <p>Supabase: {syncStatus.supabaseCount} images</p>
                  <p>Missing in Supabase: {syncStatus.missingInSupabase.length}</p>
                  <p>Missing in Firebase: {syncStatus.missingInFirebase.length}</p>
                  <p>Migrated: {syncStatus.migrated} images</p>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Compress Existing Images Section */}
        <div className="bg-gray-800 p-6 rounded-xl shadow-lg max-w-md space-y-6 mt-6">
          <h2 className="text-xl font-semibold mb-4">Compress Existing Images</h2>
          <p className="text-sm text-gray-300 mb-4">
            Compress all existing gallery images to maximum 400kb size in both Firebase and Supabase.
          </p>
          <button
            onClick={compressExistingImages}
            disabled={compressLoading || !isAuthorized}
            className={`w-full py-2 px-4 rounded font-semibold transition-colors ${
              compressLoading || !isAuthorized
                ? "bg-gray-600 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700"
            }`}
          >
            {compressLoading ? "Compressing..." : "Compress Existing Images"}
          </button>
          {compressStatus && (
            <div className="mt-4 p-4 bg-gray-700 rounded">
              {compressStatus.error ? (
                <p className="text-red-400 text-sm">{compressStatus.error}</p>
              ) : (
                <div className="text-sm text-gray-300 space-y-1">
                  <p>Total images: {compressStatus.total}</p>
                  <p>Compressed: {compressStatus.compressed}</p>
                  <p className="text-green-400">{compressStatus.message}</p>
                </div>
              )}
            </div>
          )}
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