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
import SEO from "../components/common/SEO";
import LoadingSpinner from "../components/common/LoadingSpinner";
import Modal from "../components/common/Modal";
import OptimizedImage from "../components/common/OptimizedImage";

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

  if (!post) return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center">
      <LoadingSpinner size="lg" color="white" text="Loading post..." />
    </div>
  );

  return (
    <div className="min-h-screen bg-black text-white flex">
      <SEO 
        title={`${post.author}'s Post | Code Crafters Programming Club`}
        description={post.content ? post.content.substring(0, 160) + '...' : 'View this post on Code Crafters Programming Club threads.'}
        keywords="programming, coding, community, threads, social, developers"
        type="article"
      />
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
                  <motion.div
                    key={i}
                    whileHover={{ scale: 1.05 }}
                    className="cursor-pointer rounded-lg overflow-hidden"
                    onClick={() => openPreview(url)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        openPreview(url);
                      }
                    }}
                    role="button"
                    tabIndex={0}
                    aria-label={`View image ${i + 1} in full size`}
                  >
                    <OptimizedImage
                      src={url}
                      alt={`Post image ${i + 1} by ${post.author}`}
                      className="max-h-60 object-cover w-full transition-transform hover:scale-105"
                    />
                  </motion.div>
                ))}
              </div>
            ) : post.imageUrl ? (
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="mt-4 cursor-pointer rounded-lg overflow-hidden"
                onClick={() => openPreview(post.imageUrl)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    openPreview(post.imageUrl);
                  }
                }}
                role="button"
                tabIndex={0}
                aria-label="View image in full size"
              >
                <OptimizedImage
                  src={post.imageUrl}
                  alt={`Post image by ${post.author}`}
                  className="max-w-full rounded-lg transition-transform hover:scale-105"
                />
              </motion.div>
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
                    <button 
                      onClick={handleLike}
                      className="p-1 rounded-full hover:bg-gray-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:ring-offset-black"
                      aria-label={post.likedBy?.includes(user.uid) ? 'Unlike this post' : 'Like this post'}
                    >
                      <Heart
                        size={20}
                        className={`transition-colors duration-200 ${
                          post.likedBy?.includes(user.uid) ? "text-red-500" : "text-gray-400 hover:text-red-400"
                        }`}
                      />
                    </button>
                  ) : (
                    <Heart 
                      size={20} 
                      className="text-gray-600" 
                      aria-hidden="true"
                    />
                  )}
                  <span className="text-white text-sm font-medium" aria-label={`${post.likedBy?.length || 0} likes`}>
                    {post.likedBy?.length || 0}
                  </span>
                </div>

                {/* Comment activation */}
                {user && (
                  <button
                    onClick={handleCommentsClick}
                    className="flex items-center space-x-2 px-4 py-2 rounded-full bg-gray-800 hover:bg-gray-700 text-sm text-gray-200 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-black"
                    aria-label="Write a comment on this post"
                  >
                    <MessageCircle size={16} aria-hidden="true" />
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
      <Modal
        isOpen={showPreview}
        onClose={closePreview}
        title="Image Preview"
        size="xl"
      >
        <div className="flex justify-center">
          <OptimizedImage
            src={previewImage}
            alt="Full size post image"
            className="max-h-[70vh] max-w-full object-contain"
          />
        </div>
      </Modal>
    </div>
  );
};

export default SharedPost;