import React, { useState, useEffect } from "react";
import { auth, database, db } from "../../threadsFirebaseConfig";
import { ref, onValue, push, set, remove } from "firebase/database";
import { doc, getDoc } from "firebase/firestore";
import { FaPlus, FaPaperPlane, FaTimes, FaReply, FaTrash } from "react-icons/fa";
import { LeftNavigation, BottomNavigation } from "./Navigation";
import { useNavigate } from "react-router-dom";

const DiscussionForum = () => {
  const [user, setUser] = useState(auth.currentUser);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [replyContent, setReplyContent] = useState({});
  const [loading, setLoading] = useState(true);
  const [showCompose, setShowCompose] = useState(false);
  const [replyingTo, setReplyingTo] = useState(null);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  
  // Store membership info per user uid
  const [userMemberships, setUserMemberships] = useState({});
  
  const navigate = useNavigate();

  // Listen for auth state changes
  useEffect(() => {
    const unsubscribeAuth = auth.onAuthStateChanged((currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribeAuth();
  }, []);

  // Update isMobile state on window resize
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Fetch forum messages from the Realtime Database
  useEffect(() => {
    const messagesRef = ref(database, "forumMessages");
    onValue(messagesRef, (snapshot) => {
      const data = snapshot.val();
      const loadedMessages = [];
      for (let id in data) {
        loadedMessages.push({ id, ...data[id] });
      }
      loadedMessages.sort((a, b) => b.timestamp - a.timestamp);
      setMessages(loadedMessages);
      setLoading(false);
    });
  }, []);

 // Once messages are loaded, fetch membership status for each unique author uid including replies
useEffect(() => {
  async function fetchMembershipsForMessages() {
    const memberships = {};
    // Create a set to hold unique UIDs from both messages and replies
    const uniqueUids = new Set();
    
    messages.forEach((msg) => {
      uniqueUids.add(msg.uid);
      if (msg.replies) {
        // Loop through replies and add each reply's uid
        Object.values(msg.replies).forEach((reply) => {
          uniqueUids.add(reply.uid);
        });
      }
    });
    
    // Fetch membership info for each UID
    for (const uid of uniqueUids) {
      try {
        const userDocRef = doc(db, "users", uid);
        const userDocSnap = await getDoc(userDocRef);
        memberships[uid] =
          userDocSnap.exists() && userDocSnap.data().is_members === true;
      } catch (error) {
        console.error("Error fetching membership for uid:", uid, error);
        memberships[uid] = false;
      }
    }
    setUserMemberships(memberships);
  }
  if (messages.length > 0) {
    fetchMembershipsForMessages();
  }
}, [messages]);


  // Helper function to check if a given uid is a club member
  const checkIfClubMember = (uid) => {
    return userMemberships[uid] === true;
  };

  // Auto-delete messages older than 30 days
  useEffect(() => {
    const interval = setInterval(() => {
      const now = Date.now();
      messages.forEach((msg) => {
        if (now - msg.timestamp > 30 * 24 * 60 * 60 * 1000) {
          remove(ref(database, `forumMessages/${msg.id}`));
        }
      });
    }, 24 * 60 * 60 * 1000);
    return () => clearInterval(interval);
  }, [messages]);

  const handlePostMessage = () => {
    if (!newMessage.trim()) return;
    const messagesRef = ref(database, "forumMessages");
    const newMsgRef = push(messagesRef);
    set(newMsgRef, {
      uid: user.uid,
      author: user.displayName || "Anonymous",
      avatar: user.photoURL || "https://via.placeholder.com/40",
      content: newMessage,
      timestamp: Date.now(),
    });
    setNewMessage("");
    setShowCompose(false);
  };

  const handleNavigation = (path) => {
    navigate(path);
  };

  const handleReply = (messageId) => {
    if (!replyContent[messageId]?.trim()) return;
    const repliesRef = ref(database, `forumMessages/${messageId}/replies`);
    const newReplyRef = push(repliesRef);
    set(newReplyRef, {
      uid: user.uid,
      author: user.displayName || "Anonymous",
      avatar: user.photoURL || "https://via.placeholder.com/30",
      content: replyContent[messageId],
      timestamp: Date.now(),
    });
    setReplyContent((prev) => ({ ...prev, [messageId]: "" }));
    setReplyingTo(null);
  };

  return (
    <div className="min-h-screen bg-black text-white p-6 relative flex">
      {/* Render Left Navigation only on Desktop */}
      {!isMobile && <LeftNavigation user={user} onNavigate={handleNavigation} />}
      <div className="max-w-3xl mx-auto bg-gray-900 p-6 rounded-lg shadow-lg flex-1">
        <h1 className="text-2xl font-bold text-center mb-4">Discussion Forum</h1>
        {loading ? (
          <p className="text-center text-gray-400">Loading messages...</p>
        ) : messages.length > 0 ? (
          messages.map((msg) => (
            <div key={msg.id} className="bg-gray-800 p-4 rounded-lg mb-4 shadow">
              <div className="flex items-center space-x-3">
                <img
                  src={msg.avatar}
                  alt="avatar"
                  className="w-10 h-10 mr-2 rounded-full"
                />
                <span className="text-sm text-gray-400">
                  {msg.author}
                  {checkIfClubMember(msg.uid) ? " | Club Member" : ""}
                </span>
              </div>
              <p className="text-lg mt-1">{msg.content}</p>
              <p className="text-xs text-gray-500">
                {new Date(msg.timestamp).toLocaleString()}
              </p>
              <div className="flex space-x-3 mt-2">
                <button
                  onClick={() => setReplyingTo(msg.id)}
                  className="text-green-500 flex items-center"
                >
                  <FaReply className="mr-1" /> Reply
                </button>
                {user && user.uid === msg.uid && (
                  <button
                    onClick={() =>
                      remove(ref(database, `forumMessages/${msg.id}`))
                    }
                    className="text-red-500 flex items-center"
                  >
                    <FaTrash className="mr-1" /> Delete
                  </button>
                )}
              </div>
              {msg.replies && (
                <div className="mt-3 border-l-4 border-gray-600 pl-3">
                  {Object.entries(msg.replies)
                    .sort(([, a], [, b]) => a.timestamp - b.timestamp)
                    .map(([replyId, reply]) => (
                      <div
                        key={replyId}
                        className="bg-gray-700 p-2 rounded-md mb-2"
                      >
                        <div className="flex items-center space-x-3">
                          <img
                            src={reply.avatar}
                            alt="avatar"
                            className="w-8 h-8 rounded-full"
                          />
                          <p className="text-xs text-gray-400">
                            {reply.author}
                            {checkIfClubMember(reply.uid) ? " | Club Member" : ""}
                          </p>
                        </div>
                        <p className="text-sm">{reply.content}</p>
                        <p className="text-xs text-gray-500">
                          {new Date(reply.timestamp).toLocaleString()}
                        </p>
                        {user && user.uid === reply.uid && (
                          <button
                            onClick={() =>
                              remove(
                                ref(
                                  database,
                                  `forumMessages/${msg.id}/replies/${replyId}`
                                )
                              )
                            }
                            className="text-red-500 flex items-center mt-1"
                          >
                            <FaTrash className="mr-1" /> Delete
                          </button>
                        )}
                      </div>
                    ))}
                </div>
              )}
              {replyingTo === msg.id && (
                <div className="mt-3 flex items-center bg-gray-900 p-2 rounded-md shadow-lg">
                  <textarea
                    value={replyContent[msg.id] || ""}
                    onChange={(e) =>
                      setReplyContent({
                        ...replyContent,
                        [msg.id]: e.target.value,
                      })
                    }
                    className="flex-1 p-2 rounded-md bg-gray-800 text-white resize-none"
                    placeholder="Write a reply..."
                    rows="2"
                  />
                  <button
                    onClick={() => handleReply(msg.id)}
                    className="text-blue-500 p-2"
                  >
                    <FaPaperPlane />
                  </button>
                  <button
                    onClick={() => setReplyingTo(null)}
                    className="text-red-500 p-2"
                  >
                    <FaTimes />
                  </button>
                </div>
              )}
            </div>
          ))
        ) : (
          <p className="text-center text-gray-400">
            No messages yet. Be the first to post!
          </p>
        )}
      </div>

      {/* Render Bottom Navigation only on Mobile */}
      {isMobile && <BottomNavigation user={user} onNavigate={handleNavigation} />}

      {user && (
        <>
          {isMobile ? (
            <button
              onClick={() => setShowCompose(true)}
              className="fixed bottom-20 right-6 bg-blue-500 p-4 rounded-full shadow-lg hover:bg-blue-600 transition-transform duration-300"
            >
              <FaPlus
                size={28}
                className={`${
                  showCompose ? "rotate-45" : "rotate-0"
                } transition-transform duration-300`}
              />
            </button>
          ) : (
            <button
              onClick={() => setShowCompose(true)}
              className="fixed bottom-10 right-6 bg-blue-500 p-4 rounded-full shadow-lg hover:bg-blue-600 transition-transform duration-300"
            >
              <FaPlus
                size={24}
                className={`${
                  showCompose ? "rotate-45" : "rotate-0"
                } transition-transform duration-300`}
              />
            </button>
          )}
        </>
      )}

      {/* Mobile Compose Modal */}
      {isMobile && showCompose && (
        <div
          className="fixed inset-0 bottom-20 flex items-end justify-center bg-black bg-opacity-50 z-50"
          onClick={() => setShowCompose(false)}
        >
          <div
            className="w-full sm:w-5/6 bg-gray-900 p-2 rounded-t-lg transform transition-transform duration-300 animate-slideIn"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center">
              <textarea
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder="Write your message..."
                className="flex-1 p-2 rounded-md bg-gray-800 text-white resize-none"
                rows="2"
              />
              <button onClick={handlePostMessage} className="p-2">
                <FaPaperPlane size={20} />
              </button>
              <button
                onClick={() => setShowCompose(false)}
                className="text-red-500 p-2"
              >
                <FaTimes size={20} />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Desktop Compose Modal */}
      {!isMobile && showCompose && (
        <div
          className="fixed inset-0 bottom-10 flex items-end justify-center bg-black bg-opacity-50 z-50"
          onClick={() => setShowCompose(false)}
        >
          <div
            className="w-full sm:w-5/6 bg-gray-900 p-2 rounded-t-lg transform transition-transform duration-300 animate-slideIn"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center">
              <textarea
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder="Write your message..."
                className="flex-1 p-2 rounded-md bg-gray-800 text-white resize-none"
                rows="2"
              />
              <button onClick={handlePostMessage} className="p-2">
                <FaPaperPlane size={20} />
              </button>
              <button
                onClick={() => setShowCompose(false)}
                className="text-red-500 p-2"
              >
                <FaTimes size={20} />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DiscussionForum;
