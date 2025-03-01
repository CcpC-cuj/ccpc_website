import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { auth, db } from "../threadsFirebaseConfig";
import { doc, getDoc, updateDoc, arrayUnion, arrayRemove, onSnapshot } from "firebase/firestore";
import { GoogleAuthProvider, signInWithPopup, onAuthStateChanged } from "firebase/auth";
import { LeftNavigation, BottomNavigation } from "../components/threads/Navigation";
import { motion } from "framer-motion";

const SharedPost = () => {
  const { postId } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [user, setUser] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const [showPreview, setShowPreview] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  // Detect screen size for responsive layout
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Fetch post data & listen for live updates
  useEffect(() => {
    const postRef = doc(db, "posts", postId);
    const unsubscribe = onSnapshot(postRef, (docSnap) => {
      if (docSnap.exists() && docSnap.data().isPublic) {
        setPost({ id: docSnap.id, ...docSnap.data() });
      } else {
        navigate("/");
      }
    });

    return () => unsubscribe();
  }, [postId, navigate]);

  // Listen for auth state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  // Google Login
  const handleGoogleLogin = async () => {
    const provider = new GoogleAuthProvider();
    await signInWithPopup(auth, provider);
  };

  // Like/Unlike Post
  const handleLike = async () => {
    if (!user) return;
    const postDocRef = doc(db, "posts", postId);
    const isLiked = post?.likedBy?.includes(user.uid);

    await updateDoc(postDocRef, {
      likedBy: isLiked ? arrayRemove(user.uid) : arrayUnion(user.uid),
    });
  };

  // Open Image Preview
  const openPreview = (url) => {
    setPreviewImage(url);
    setShowPreview(true);
  };

  if (!post) return <p className="text-center text-gray-400 mt-6">Loading post...</p>;

  return (
    <div className="min-h-screen bg-black text-white flex">
      {/* Left Navigation (for logged-in users only) */}
      {user && !isMobile && (
        <div className="w-1/5 fixed h-screen">
          <LeftNavigation user={user} onNavigate={navigate} />
        </div>
      )}

      {/* Main Content */}
      <div className={`flex flex-col flex-1 ${user && !isMobile ? "ml-1/5" : ""} p-6`}>
        {/* Show Navigation if Mobile */}
        {user && isMobile && <BottomNavigation user={user} onNavigate={navigate} />}

        <div className="flex justify-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-gray-900 bg-opacity-90 p-6 rounded-xl shadow-2xl w-full max-w-xl"
          >
            <h3 className="text-xl font-bold text-center">{post.author}</h3>

            {/* Show Images */}
            {post.imageUrls && post.imageUrls.length > 0 ? (
              <div className="grid grid-cols-2 gap-2 mt-4">
                {post.imageUrls.map((url, index) => (
                  <motion.img
                    key={index}
                    src={url}
                    alt={`Post visual ${index}`}
                    className="cursor-pointer rounded-lg max-h-60 object-cover transition-transform transform hover:scale-105"
                    whileHover={{ scale: 1.05 }}
                    onClick={() => openPreview(url)}
                  />
                ))}
              </div>
            ) : post.imageUrl ? (
              <motion.img
                src={post.imageUrl}
                alt="Post visual"
                className="mt-4 max-w-full rounded-lg cursor-pointer transition-transform transform hover:scale-105"
                whileHover={{ scale: 1.05 }}
                onClick={() => openPreview(post.imageUrl)}
              />
            ) : null}

            <p className="text-sm mt-2 text-start whitespace-pre-wrap text-gray-300">{post.content}</p>

            {/* Like Button */}
            <div className="flex flex-col items-center mt-4">
            <p className="text-sm text-gray-400 text-center mt-2">
              {post.likedBy?.length || 0} {post.likedBy?.length === 1 ? "like" : "likes"}
            </p>
              {user ? (
                <button
                  onClick={handleLike}
                  className={`px-5 py-2 rounded-lg transition transform hover:scale-105 ${
                    post.likedBy?.includes(user.uid)
                      ? "bg-red-500 hover:bg-red-600 text-white"
                      : "bg-gradient-to-r from-blue-500 to-purple-500 text-white hover:from-blue-600 hover:to-purple-600"
                  }`}
                >
                  {post.likedBy?.includes(user.uid) ? "Unlike" : "Like"}
                </button>
              ) : (
                
                <button
                  onClick={handleGoogleLogin}
                  className="bg-blue-500 text-white px-5 py-2 rounded-lg hover:bg-blue-700 transition transform hover:scale-105"
                >
                  Continue with Google to Like & Comment
                </button>
              )}
            </div>

            
          </motion.div>
        </div>
      </div>

      {/* Image Preview Modal */}
      {showPreview && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-80 z-50"
          onClick={() => {
            setShowPreview(false);
            setPreviewImage(null);
          }}
        >
          <motion.div
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0.8 }}
            transition={{ duration: 0.3 }}
            className="relative"
          >
            <img src={previewImage} alt="Preview" className="max-h-96 max-w-full rounded-lg shadow-xl" />
            <button
              onClick={() => {
                setShowPreview(false);
                setPreviewImage(null);
              }}
              className="absolute -top-10 right-4 text-3xl text-white p-2 rounded-full "
            >
              &times;
            </button>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
};

export default SharedPost;
