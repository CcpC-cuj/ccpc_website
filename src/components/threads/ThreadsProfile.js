import React, { useEffect, useState } from "react";
import { auth, db, storage } from "../../threadsFirebaseConfig";
import { onAuthStateChanged } from "firebase/auth";
import Footer from "../Footer";
import { useNavigate } from "react-router-dom";
import {
  doc,
  onSnapshot,
  collection,
  query,
  where,
  orderBy,
  updateDoc,
  deleteDoc,
  getDocs,
} from "firebase/firestore";
import { signOut } from "firebase/auth";
import { FaEllipsisH } from "react-icons/fa";
import { deleteObject } from "firebase/storage";
import { ref as storageRef } from "firebase/storage";
import { supabase } from "../../supabaseClient";

const ProfilePage = () => {
  const [userData, setUserData] = useState(null);
  const [userPosts, setUserPosts] = useState([]);
  const [loadingPosts, setLoadingPosts] = useState(true);
  const [openDropdownPostId, setOpenDropdownPostId] = useState(null);
  const [editingPostId, setEditingPostId] = useState(null);
  const [editContent, setEditContent] = useState("");
  const [showEditModal, setShowEditModal] = useState(false);
  const [authLoading, setAuthLoading] = useState(true);
  const [initializedUser, setInitializedUser] = useState(null);
  const currentUser = initializedUser;
  // wait for Firebase to restore the user
  useEffect(() => {
     const unsub = onAuthStateChanged(auth, user => {
       setInitializedUser(user);
       setAuthLoading(false);
     });
     return unsub;
   }, []);
  const navigate = useNavigate();
  // Listen for real-time updates to the user's profile document.
  useEffect(() => {
    if (currentUser) {
      const userDocRef = doc(db, "users", currentUser.uid);
      const unsubscribe = onSnapshot(userDocRef, (docSnap) => {
        if (docSnap.exists()) {
          setUserData(docSnap.data());
        }
      });
      return () => unsubscribe();
    }
  }, [currentUser]);

  // If the user is a member, fetch their posts from Firestore.
  useEffect(() => {
    if (currentUser && userData && userData.is_members) {
      const postsQuery = query(
        collection(db, "posts"),
        where("uid", "==", currentUser.uid),
        orderBy("timestamp", "desc")
      );
      const unsubscribePosts = onSnapshot(postsQuery, (snapshot) => {
        const postsArray = snapshot.docs.map((docSnap) => ({
          id: docSnap.id,
          ...docSnap.data(),
        }));
        setUserPosts(postsArray);
        setLoadingPosts(false);
      });
      return () => unsubscribePosts();
    } else {
      setLoadingPosts(false);
    }
  }, [currentUser, userData]);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate("/threads");
    } catch (err) {
      console.error("Logout error:", err);
    }
  };

  // Delete post, its associated images, and comments.
  const handleDelete = async (post) => {
    if (window.confirm("Are you sure you want to delete this post?")) {
      try {
        // 1. Delete all comments from the "comments" subcollection.
        const commentsRef = collection(db, "posts", post.id, "comments");
        const commentsSnapshot = await getDocs(commentsRef);
        const commentDeletionPromises = commentsSnapshot.docs.map((commentDoc) =>
          deleteDoc(doc(db, "posts", post.id, "comments", commentDoc.id))
        );
        await Promise.all(commentDeletionPromises);
  
        // 2. Delete associated images from Supabase or Firebase Storage
        if (post.imageUrls && post.imageUrls.length > 0) {
          const deletePromises = post.imageUrls.map(async (url) => {
            try {
              if (url.includes("/storage/v1/object/public/CcpC/")) {
                // Supabase image
                const filePath = url.split("/storage/v1/object/public/CcpC/")[1];
                if (filePath) {
                  await supabase.storage.from("CcpC").remove([filePath]);
                  console.log(`Deleted Supabase file at ${filePath}`);
                }
              } else if (url.includes("firebasestorage.googleapis.com")) {
                // Firebase image (legacy)
                const urlObj = new URL(url);
                const fullPathEncoded = urlObj.pathname.split("/o/")[1];
                const filePath = decodeURIComponent(fullPathEncoded);
                const fileRef = storageRef(storage, filePath);
                await deleteObject(fileRef);
                console.log(`Deleted Firebase file at ${filePath}`);
              }
            } catch (err) {
              console.error("Failed to delete file from storage:", err);
            }
          });
          await Promise.all(deletePromises);
        }
        
        // 3. Delete the post document from Firestore.
        await deleteDoc(doc(db, "posts", post.id));
      } catch (error) {
        console.error("Error deleting post:", error);
      }
    }
  };
  

  // Initiate editing of a post.
  const handleEdit = (post) => {
    setEditingPostId(post.id);
    setEditContent(post.content);
    setShowEditModal(true);
  };

  // Submit the edited post.
  const handleEditSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateDoc(doc(db, "posts", editingPostId), { content: editContent });
      setShowEditModal(false);
      setEditingPostId(null);
      setEditContent("");
    } catch (error) {
      console.error("Error updating post:", error);
    }
  };

  if (authLoading) {
     return <div className="min-h-screen flex items-center justify-center bg-black text-white">Loading…</div>;
   }
   if (!initializedUser) {
        return (
          <div className="min-h-screen flex items-center justify-center bg-black text-white">
            <p>You must be logged in to view your profile.</p>
          </div>
        );
   }
  return (
    <div className="relative min-h-screen bg-black text-white">
      {/* <Starfield className="absolute inset-0 -z-10" /> */}
      <div className="max-w-4xl min-h-screen mx-auto py-8 px-4">
        <div className="flex flex-row justify-evenly items-center">
          <img
            src={userData?.photoURL || "https://via.placeholder.com/150"}
            alt="User avatar"
            className="w-32 h-32 rounded-full border-4 border-gray-700 mb-4"
          />
          <div>
            <h1 className="text-3xl font-bold">
              {userData?.displayName || currentUser.displayName}
            </h1>
            <p className="text-l font-bold">
              {userData?.email || currentUser.email}
            </p>
            <button
              onClick={handleLogout}
              className="mt-2 px-2 py-2 bg-gradient-to-r from-red-500 to-yellow-500 rounded-md font-bold text-white hover:from-yellow-500 hover:to-red-500 transition-colors"
            >
              Logout
            </button>
          </div>
        </div>

        {/* For members, display their posts */}
        {userData && userData.is_members && (
          <div className="mt-8">
            <h2 className="text-2xl font-semibold mb-4">Your Posts</h2>
            {loadingPosts ? (
              <p>Loading your posts...</p>
            ) : userPosts.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {userPosts.map((post) => (
                  <div
                    key={post.id}
                    className="relative bg-gray-900 bg-opacity-80 p-4 rounded-lg shadow-lg"
                  >
                    {/* Dropdown Menu */}
                    <div className="absolute top-2 right-2">
                      <button onClick={() => setOpenDropdownPostId(post.id)}>
                        <FaEllipsisH className="text-gray-400" />
                      </button>
                      {openDropdownPostId === post.id && (
                        <div className="absolute right-0 mt-2 w-32 bg-gray-800 border border-gray-700 rounded shadow-lg z-10">
                          <button
                            onClick={() => {
                              handleEdit(post);
                              setOpenDropdownPostId(null);
                            }}
                            className="block w-full text-left px-4 py-2 text-sm text-white hover:bg-gray-700"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => {
                              handleDelete(post);
                              setOpenDropdownPostId(null);
                            }}
                            className="block w-full text-left px-4 py-2 text-sm text-white hover:bg-gray-700"
                          >
                            Delete
                          </button>
                          <button
                            onClick={() => setOpenDropdownPostId(null)}
                            className="block w-full text-left px-4 py-2 text-sm text-white hover:bg-gray-700"
                          >
                            Cancel
                          </button>
                        </div>
                      )}
                    </div>
                    <p className="text-sm" style={{ whiteSpace: "pre-wrap" }}>
                      {post.content}
                    </p>
                    {post.imageUrls && post.imageUrls.length > 0 && (
                      <div className="grid grid-cols-2 gap-2 mt-2">
                        {post.imageUrls.map((url, index) => (
                          <img
                            key={index}
                            src={url}
                            alt={`Post image ${index}`}
                            className="rounded"
                          />
                        ))}
                      </div>
                    )}
                    <p className="text-xs text-gray-500 mt-1">
                      {post.timestamp
                        ? new Date(post.timestamp.seconds * 1000).toLocaleString()
                        : ""}
                    </p>
                  </div>
                ))}
              </div>
            ) : (
              <p>You have not made any posts yet.</p>
            )}
          </div>
        )}
      </div>
      <Footer />

      {/* Edit Modal */}
      {showEditModal && (
        <div
          className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-80 z-50"
          onClick={() => setShowEditModal(false)}
        >
          <div className="bg-gray-800 p-6 rounded-lg" onClick={(e) => e.stopPropagation()}>
            <h3 className="text-xl font-bold text-white mb-4">Edit Post</h3>
            <form onSubmit={handleEditSubmit}>
              <textarea
                value={editContent}
                onChange={(e) => setEditContent(e.target.value)}
                className="w-full p-4 rounded-md bg-gray-700 text-white"
                rows="5"
              />
              <div className="flex justify-end mt-4">
                <button
                  type="button"
                  onClick={() => setShowEditModal(false)}
                  className="mr-4 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfilePage;
