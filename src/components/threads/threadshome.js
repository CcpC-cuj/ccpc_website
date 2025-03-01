import React, { useEffect, useState } from "react";
import { auth, db } from "../../threadsFirebaseConfig";
import Footer from "../Footer";
import Starfield from "../Starfield";
import { onAuthStateChanged } from "firebase/auth";
import {
  collection,
  query,
  orderBy,
  onSnapshot,
  doc,
  updateDoc,
  arrayUnion,
  arrayRemove,
} from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { LeftNavigation, BottomNavigation } from "./Navigation"; // adjust path as needed
import Comments from "./Comments";
import CommentForm from "./CommentForm";

const ThreadsHome = () => {
  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState([]);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [previewImage, setPreviewImage] = useState(null);
  const [showPreview, setShowPreview] = useState(false);
  const navigate = useNavigate();

  // Update isMobile state on window resize.
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Listen for auth state changes and fetch posts.
  useEffect(() => {
    const unsubscribeAuth = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    const postsQuery = query(
      collection(db, "posts"),
      orderBy("timestamp", "desc")
    );
    const unsubscribePosts = onSnapshot(postsQuery, (snapshot) => {
      const postsData = snapshot.docs.map((docSnap) => ({
        id: docSnap.id,
        ...docSnap.data(),
      }));
      setPosts(postsData);
    });

    return () => {
      unsubscribeAuth();
      unsubscribePosts();
    };
  }, []);

  const handleNavigation = (path) => {
    navigate(path);
  };

  const openPreview = (url) => {
    setPreviewImage(url);
    setShowPreview(true);
  };

  // Toggle like for a post.
  const handleLike = async (post) => {
    if (!auth.currentUser) return;
    const postDocRef = doc(db, "posts", post.id);
    const currentUserId = auth.currentUser.uid;
    // Use the likedBy array to toggle like/unlike.
    const likedBy = post.likedBy || [];
    try {
      if (likedBy.includes(currentUserId)) {
        // User has already liked the post; remove their uid.
        await updateDoc(postDocRef, {
          likedBy: arrayRemove(currentUserId),
        });
      } else {
        // Add the user's uid to likedBy.
        await updateDoc(postDocRef, {
          likedBy: arrayUnion(currentUserId),
        });
      }
    } catch (error) {
      console.error("Error toggling like:", error);
    }
  };

  // Render posts, filtering to public posts and showing multiple images if available.
  const renderPosts = () => {
    const publicPosts = posts.filter((post) => post.isPublic);
    if (publicPosts.length === 0) {
      return (
        <p className="text-center text-gray-400 mt-4">
          No posts available yet.
        </p>
      );
    }
    return publicPosts.map((post) => (
      <div
        key={post.id}
        className="mb-4 bg-gray-900 bg-opacity-80 p-4 rounded-lg shadow-lg hover:shadow-2xl m-10 transition-shadow max-w-xl mx-auto"
      >
        <h3 className="text-xl font-bold">{post.author}</h3>
        <p className="text-sm mt-2" style={{ whiteSpace: "pre-wrap" }}>
          {post.content}
        </p>
        {post.imageUrls && post.imageUrls.length > 0 ? (
          <div className="grid grid-cols-2 gap-2 mt-4">
            {post.imageUrls.map((url, index) => (
              <img
                key={index}
                src={url}
                alt={`Post visual ${index}`}
                className="cursor-pointer rounded"
                onClick={() => openPreview(url)}
              />
            ))}
          </div>
        ) : post.imageUrl ? (
          <img
            src={post.imageUrl}
            alt="Post visual"
            className="mt-4 max-w-full rounded cursor-pointer"
            onClick={() => openPreview(post.imageUrl)}
          />
        ) : null}
        <div className="flex items-center mt-2">
          <button
            onClick={() => handleLike(post)}
            className="text-blue-400 hover:text-blue-600 mr-2"
          >
            {post.likedBy && auth.currentUser && post.likedBy.includes(auth.currentUser.uid)
              ? "Unlike"
              : "Like"}
          </button>
          <span className="text-xs text-gray-500">
            {(post.likedBy ? post.likedBy.length : 0)} likes
          </span>
        </div>
        <div className="mt-2">
          <Comments postId={post.id} />
          <CommentForm postId={post.id} />
        </div>
        <p className="text-xs text-gray-500 mt-1">
          {post.timestamp
            ? new Date(post.timestamp.seconds * 1000).toLocaleString()
            : ""}
        </p>
      </div>
    ));
  };

  // Mobile Layout
  const mobileLayout = (
    <div className="relative min-h-screen bg-black text-white flex flex-col">
      <header className="py-4 text-center border-b border-gray-700">
        <h1 className="text-2xl font-bold">Threads</h1>
      </header>
      <main className="flex-1 overflow-auto p-2 max-w-xl">{renderPosts()}</main>
      <BottomNavigation onNavigate={handleNavigation} user={user} />
    </div>
  );

  // Desktop Layout
  const desktopLayout = (
    <div className="relative min-h-screen bg-black text-white">
      <header className="py-4 border-b border-gray-700 text-center">
        <h1 className="text-3xl font-bold">Threads</h1>
      </header>
      <div className="relative flex">
        <LeftNavigation onNavigate={handleNavigation} user={user} />
        <main className="w-4/5 p-6 overflow-auto min-h-[calc(100vh-8rem)]">
          <section>
            <h2 className="text-2xl font-semibold mb-6">Latest Threads</h2>
            {renderPosts()}
          </section>
        </main>
      </div>
      <Footer />
    </div>
  );

  return (
    <>
      {isMobile ? mobileLayout : desktopLayout}
      {showPreview && (
        <div
          className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-80 z-50"
          onClick={() => {
            setShowPreview(false);
            setPreviewImage(null);
          }}
        >
          <div className="relative" onClick={(e) => e.stopPropagation()}>
            <img
              src={previewImage}
              alt="Preview"
              className="max-h-full max-w-full rounded"
            />
            <button
              onClick={() => {
                setShowPreview(false);
                setPreviewImage(null);
              }}
              style={{ color: "#ef4444" }}
              className="absolute top-[-7.5rem] right-[-3.75rem] md:top-[-5rem] md:right-[-2.5rem] text-3xl p-2"
            >
              &times;
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default ThreadsHome;
