import React, { useEffect, useState } from "react";
import { storage, db, auth, database } from "../../threadsFirebaseConfig";
import { ref as storageRef, uploadBytes, getDownloadURL } from "firebase/storage";

import { addDoc, collection, serverTimestamp, doc, getDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
const CreatePost = () => {
  const [content, setContent] = useState("");
  const [files, setFiles] = useState([]); // holds multiple image files
  const [isPublic, setIsPublic] = useState(true); // toggle for public vs private
  const [canPost, setCanPost] = useState(null); // null = loading; true/false membership status
  const [errorMsg, setErrorMsg] = useState("");
  const navigate = useNavigate();
   // Check membership status from Firestore.
   useEffect(() => {
    const checkMembership = async () => {
      if (auth.currentUser) {
        try {
          const userDocRef = doc(db, "users", auth.currentUser.uid);
          const userDocSnap = await getDoc(userDocRef);
          if (userDocSnap.exists() && userDocSnap.data().is_members === true) {
            setCanPost(true);
          } else {
            setCanPost(false);
            setErrorMsg("You are not a member. You cannot post. Please contact the admin.");
          }
        } catch (err) {
          console.error("Error checking membership:", err);
          setCanPost(false);
          setErrorMsg("Error checking membership status.");
        }
      }
    };

    checkMembership();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let imageUrls = [];
      if (files.length > 0) {
        // Limit to 4 images.
        const selectedFiles = files.slice(0, 4);
        const folder = isPublic ? "public" : "private";
        // Upload all selected files concurrently and get their download URLs.
        const uploadPromises = selectedFiles.map((file) => {
          const sRef = storageRef(storage, `${folder}/${file.name}-${Date.now()}`);
          return uploadBytes(sRef, file).then(() => getDownloadURL(sRef));
        });
        imageUrls = await Promise.all(uploadPromises);
      }
  
      await addDoc(collection(db, "posts"), {
        uid: auth.currentUser ? auth.currentUser.uid : null, // Added user ID field.
        author: auth.currentUser ? auth.currentUser.displayName : "Anonymous",
        content,
        imageUrls, // store an array of image URLs
        isPublic,
        timestamp: serverTimestamp(),
      });
      // Clear the form after posting.
      setContent("");
      setFiles([]);
      navigate("/threads");
    } catch (error) {
      console.error("Error creating post:", error);
    }
  };
  

  const handleFileChange = (e) => {
    // Convert FileList to an array.
    const newFiles = Array.from(e.target.files);
    // Append new files to the existing list and limit to 4 files.
    setFiles((prevFiles) => [...prevFiles, ...newFiles].slice(0, 4));
  };

  const removeFile = (indexToRemove) => {
    setFiles(files.filter((_, index) => index !== indexToRemove));
  };

  // While membership is loading.
  if (canPost === null) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black text-white">
        <p>Loading membership status...</p>
      </div>
    );
  }

  // If user is not a member.
  if (!canPost) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-black text-white">
        <p className="text-center">{errorMsg}</p>
      </div>
    );
  }

  // If user is a member, show the form.
  return (
    <div className="min-h-screen flex items-center justify-center bg-black">
      <div className="max-w-xl w-full bg-gray-900 bg-opacity-80 p-8 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-white mb-6 text-center">Create a Post</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <textarea
            placeholder="What's on your mind?"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required style={{ whiteSpace: "pre-wrap" }}
            className="w-full p-4 rounded-md bg-gray-800 text-white placeholder-gray-400 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <div className="flex flex-col">
            <label className="text-white mb-2">Upload Images (up to 4)</label>
            <input
              type="file"
              accept="image/*"
              multiple
              onChange={handleFileChange}
              className="text-white"
            />
          </div>
          {/* Preview Section */}
          {files.length > 0 && (
            <div className="grid grid-cols-2 gap-4">
              {files.map((file, index) => (
                <div key={index} className="relative">
                  <img
                    src={URL.createObjectURL(file)}
                    alt={`Preview ${index}`}
                    className="w-full h-32 object-cover rounded"
                  />
                  <button
                    type="button"
                    onClick={() => removeFile(index)}
                    className="absolute top-1 right-1 bg-red-600 text-white rounded-full w-6 h-6 flex items-center justify-center"
                  >
                    &times;
                  </button>
                </div>
              ))}
            </div>
          )}
          <div className="flex items-center">
            <input
              type="checkbox"
              checked={isPublic}
              onChange={(e) => setIsPublic(e.target.checked)}
              className="mr-2"
            />
            <label className="text-white">Public Post</label>
          </div>
          <button
            type="submit"
            className="w-full py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white font-bold rounded-md hover:from-purple-500 hover:to-blue-500 transition-colors"
          >
            Post
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreatePost;
