// SharedPost.jsx
import React, { useEffect, useState, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { auth, db } from "../threadsFirebaseConfig";
import { doc, getDoc, updateDoc, arrayUnion, arrayRemove, onSnapshot } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import { LeftNavigation, BottomNavigation } from "../components/threads/Navigation";
import SignIn from "../components/threads/signinThreads";
import Comments from "../components/threads/Comments";
import CommentForm from "../components/threads/CommentForm";
import { motion } from "framer-motion";
import { Heart, MessageCircle } from "lucide-react";

const SharedPost = () => {
  const { postId } = useParams();
  const navigate = useNavigate();

  const [post, setPost] = useState(null);
  const [user, setUser] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const [showPreview, setShowPreview] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [showCommentForm, setShowCommentForm] = useState(false);
  const [focusComment, setFocusComment] = useState(false);
  const commentFormRef = useRef(null);

  // Handle window resize
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Subscribe to post data
  useEffect(() => {
    const postRef = doc(db, "posts", postId);
    const unsubscribe = onSnapshot(postRef, (snap) => {
      const data = snap.data();
      if (snap.exists() && data.isPublic) {
        setPost({ id: snap.id, ...data });
      } else {
        navigate("/");
      }
    });
    return () => unsubscribe();
  }, [postId, navigate]);

  // Subscribe to auth state
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (u) => {
      if (u) {
        const userDocRef = doc(db, "users", u.uid);
        const userDoc = await getDoc(userDocRef);
        setUser(userDoc.exists() ? { uid: u.uid, ...userDoc.data() } : u);
      } else {
        setUser(null);
      }
    });
    return () => unsubscribe();
  }, []);

  // Toggle like
  const handleLike = async () => {
    if (!user) return;
    const postRef = doc(db, "posts", postId);
    const liked = post.likedBy?.includes(user.uid);
    await updateDoc(postRef, {
      likedBy: liked ? arrayRemove(user.uid) : arrayUnion(user.uid),
    });
    setFocusComment(false);
  };

  // Toggle comment form visibility & focus
  const handleCommentsClick = () => {
    setShowCommentForm(true);
    setFocusComment(true);
    // Scroll into view
    setTimeout(() => {
      commentFormRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 100);
  };

  const openPreview = (url) => {
    setPreviewImage(url);
    setShowPreview(true);
  };
  const closePreview = () => setShowPreview(false);

  if (!post) return <p className="text-center text-gray-400 mt-6">Loading post...</p>;

  return (
    <div className="min-h-screen bg-black text-white flex">
      {user && !isMobile && (
        <div className="w-1/5 fixed h-screen">
          <LeftNavigation user={user} onNavigate={navigate} />
        </div>
      )}

      <div className={`flex flex-col flex-1 ${user && !isMobile ? "ml-1/5" : ""} p-6`}>
        {user && isMobile && <BottomNavigation user={user} onNavigate={navigate} />}

        <div className="flex justify-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-gray-900 bg-opacity-90 p-6 rounded-xl shadow-2xl w-full max-w-xl"
          >
            {/* Author */}
            <h3 className="text-xl font-bold text-center">{post.author}</h3>

            {/* Images */}
            {post.imageUrls?.length > 0 ? (
              <div className="grid grid-cols-2 gap-2 mt-4">
                {post.imageUrls.map((url, i) => (
                  <motion.img
                    key={i}
                    src={url}
                    alt={`Post visual ${i}`}
                    className="cursor-pointer rounded-lg max-h-60 object-cover transition-transform hover:scale-105"
                    whileHover={{ scale: 1.05 }}
                    onClick={() => openPreview(url)}
                  />
                ))}
              </div>
            ) : post.imageUrl ? (
              <motion.img
                src={post.imageUrl}
                alt="Post visual"
                className="mt-4 max-w-full rounded-lg cursor-pointer transition-transform hover:scale-105"
                whileHover={{ scale: 1.05 }}
                onClick={() => openPreview(post.imageUrl)}
              />
            ) : null}

            {/* Content */}
            <p className="mt-2 text-sm whitespace-pre-wrap text-gray-300 text-start">
              {post.content}
            </p>

            {/* Actions */}
            <div className="mt-6 border-t border-gray-700 pt-6">
              <div className="flex items-center space-x-6">
                {/* Like icon & count */}
                <div className="flex items-center space-x-2">
                  {user ? (
                    <button onClick={handleLike}>
                      <Heart
                        size={20}
                        className={post.likedBy?.includes(user.uid) ? "text-red-500" : "text-gray-400"}
                      />
                    </button>
                  ) : (
                    <Heart size={20} className="text-gray-600 pointer-events-none" />
                  )}
                  <span className="text-white text-sm font-medium">
                    {post.likedBy?.length || 0}
                  </span>
                </div>

                {/* Comment activation */}
                {user && (
                  <button
                    onClick={handleCommentsClick}
                    className="flex items-center space-x-2 px-4 py-2 rounded-full bg-gray-800 hover:bg-gray-700 text-sm text-gray-200 transition"
                  >
                    <MessageCircle size={16} />
                    <span>Comment</span>
                  </button>
                )}
              </div>

              {/* Comment form + Comments list */}
              <div className="mt-4 space-y-4">
                <div ref={commentFormRef}>
                  {user ? (
                    showCommentForm && (
                      <CommentForm postId={postId} autoFocus={focusComment} />
                    )
                  ) : (
                    <SignIn
                      redirectPath={`/post/${postId}`}
                      buttonText="Login to Comment"
                    />
                  )}
                </div>
                <Comments postId={postId} />
              </div>
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
          onClick={closePreview}
        >
          <motion.div
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0.8 }}
            transition={{ duration: 0.3 }}
            className="relative"
          >
            <img
              src={previewImage}
              alt="Preview"
              className="max-h-96 max-w-full rounded-lg shadow-xl"
            />
            <button
              onClick={closePreview}
              className="absolute -top-10 right-4 text-3xl text-white p-2 rounded-full"
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