// ThreadsHome.jsx
import React, { useEffect, useState } from "react";
import { auth, db } from "../../threadsFirebaseConfig";
import Footer from "../Footer";
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
  getDoc,
} from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { LeftNavigation, BottomNavigation } from "./Navigation";
import { FaShare } from "react-icons/fa";
import { Heart, MessageCircle } from "lucide-react";
import Comments from "./Comments";
import CommentForm from "./CommentForm";
import THREADSLOGO from "../logo/threads";

const ThreadsHome = () => {
  const [user, setUser] = useState(null);
  const [userData, setUserData] = useState(null);
  const [posts, setPosts] = useState([]);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [previewImage, setPreviewImage] = useState(null);
  const [showPreview, setShowPreview] = useState(false);
  const [activeCommentPostId, setActiveCommentPostId] = useState(null);
  const navigate = useNavigate();

  // Handle resize
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Fetch posts
  useEffect(() => {
    const q = query(collection(db, "posts"), orderBy("timestamp", "desc"));
    const unsub = onSnapshot(q, async (snapshot) => {
      const data = await Promise.all(
        snapshot.docs.map(async (docSnap) => {
          const post = { id: docSnap.id, ...docSnap.data() };
          const userDoc = await getDoc(doc(db, "users", post.uid));
          return {
            ...post,
            authorImage: userDoc.exists() ? userDoc.data().photoURL : null,
          };
        })
      );
      setPosts(data);
    });
    return () => unsub();
  }, []);

  // Auth listener
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        const userDoc = await getDoc(doc(db, "users", currentUser.uid));
        setUserData(userDoc.exists() ? userDoc.data() : null);
      }
    });
    return () => unsub();
  }, []);

  const openPreview = (url) => {
    setPreviewImage(url);
    setShowPreview(true);
  };

  const handleLike = async (post) => {
    if (!user) return;
    const ref = doc(db, "posts", post.id);
    const uid = user.uid;
    const liked = post.likedBy || [];
    await updateDoc(ref, {
      likedBy: liked.includes(uid) ? arrayRemove(uid) : arrayUnion(uid),
    });
  };

  const activateCommentForm = (id) => {
    setActiveCommentPostId(id);
  };

  const renderPosts = () => {
    if (!userData) return <p className="text-center text-gray-400 mt-4">Loading...</p>;

    const filtered = posts.filter((p) => p.isPublic || userData.is_members);
    if (!filtered.length)
      return <p className="text-center text-gray-400 mt-4">No posts available yet.</p>;

    return filtered.map((post) => {
      const isActive = activeCommentPostId === post.id;
      return (
        <div
          key={post.id}
          className="mb-6 bg-gray-900 p-4 rounded-xl shadow-lg max-w-xl mx-auto"
        >
          {/* Share */}
          <div className="flex justify-end">
            <button
              onClick={() => {
                navigator.clipboard.writeText(
                  `${window.location.origin}/post/${post.id}`
                );
                alert("Link copied!");
              }}
              className="text-green-400 hover:text-green-600"
            >
              <FaShare />
            </button>
          </div>

          {/* Author */}
          <div className="flex items-center space-x-3 mb-2">
            {post.authorImage ? (
              <img
                src={post.authorImage}
                alt="Author"
                className="w-10 h-10 rounded-full"
              />
            ) : (
              <div className="w-10 h-10 rounded-full bg-gray-500" />
            )}
            <h3 className="text-lg font-semibold text-white">{post.author}</h3>
          </div>

          {/* Images */}
          {post.imageUrls?.length ? (
            <div className="grid grid-cols-2 gap-2 mb-4">
              {post.imageUrls.map((url, i) => (
                <img
                  key={i}
                  src={url}
                  alt={`Visual ${i}`}
                  className="cursor-pointer rounded  min-w-36 max-w-64 max-h-64 object-cover"
                  onClick={() => openPreview(url)}
                />
              ))}
            </div>
          ) : post.imageUrl ? (
            <img
              src={post.imageUrl}
              alt="Visual"
              className="mb-4 rounded cursor-pointer"
              onClick={() => openPreview(post.imageUrl)}
            />
          ) : null}

          {/* Content */}
          <p className="text-sm mb-4 whitespace-pre-wrap text-gray-200">
            {post.content}
          </p>

          {/* Actions */}
          <div className="flex items-center space-x-6 mb-4">
            <div className="flex items-center space-x-1">
              <button onClick={() => handleLike(post)}>
                <Heart
                  size={20}
                  className={
                    user && post.likedBy?.includes(user.uid)
                      ? "text-red-500"
                      : "text-gray-600"
                  }
                />
              </button>
              <span className="text-sm text-white font-medium">
                {post.likedBy?.length || 0}
              </span>
            </div>
            <button
              onClick={() => activateCommentForm(post.id)}
              className="flex items-center space-x-1 px-3 py-1 rounded-full bg-gray-800 hover:bg-gray-700 text-sm text-gray-200"
            >
              <MessageCircle size={16} />
              <span>Comment</span>
            </button>
          </div>

          {/* Comment form & list */}
          <div className="space-y-3">
            {isActive && (
              <CommentForm postId={post.id} autoFocus />
            )}
            <Comments postId={post.id} />
          </div>

          {/* Timestamp */}
          <p className="text-xs text-gray-500 mt-2">
            {post.timestamp
              ? new Date(post.timestamp.seconds * 1000).toLocaleString()
              : ""}
          </p>
        </div>
      );
    });
  };

  const mobile = (
    <div className="bg-black text-white min-h-screen flex flex-col">
      <header className="px-4 py-3 border-b border-gray-700 flex items-center justify-center space-x-2">
        <THREADSLOGO className="h-8 w-8" />
        <h1 className="text-xl font-bold">Threads</h1>
      </header>
      <main className="p-2 flex-1 overflow-auto">{renderPosts()}</main>
      <BottomNavigation user={user} onNavigate={navigate} isMember={userData?.is_members} />
    </div>
  );

  const desktop = (
    <div className="bg-black text-white min-h-screen">
      <header className="py-4 border-b border-gray-700 flex items-center justify-center space-x-2">
        <THREADSLOGO className="h-10 w-10" />
        <h1 className="text-2xl font-bold">Threads</h1>
      </header>
      <div className="flex">
        <LeftNavigation user={user} onNavigate={navigate} isMember={userData?.is_members} />
        <main className="flex-1 p-6 overflow-auto">
          <h2 className="text-2xl font-semibold mb-6 text-white">Latest Threads</h2>
          {renderPosts()}
        </main>
      </div>
      <Footer />
    </div>
  );

  return (
    <>
      {isMobile ? mobile : desktop}
      {showPreview && (
        <div
          className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50"
          onClick={() => setShowPreview(false)}
        >
          <div className="relative">
            <img src={previewImage} alt="Preview" className="max-h-96 max-w-full rounded" />
            <button
              onClick={() => setShowPreview(false)}
              className="absolute top-0 right-0 text-2xl text-white p-2"
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