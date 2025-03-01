import React, { useState, useEffect } from "react";
import { db, auth } from "../../threadsFirebaseConfig";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { FaPaperPlane } from "react-icons/fa";

const CommentForm = ({ postId }) => {
  const [comment, setComment] = useState("");
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!comment.trim()) return;
    try {
      const commentData = {
        author: auth.currentUser.displayName,
        content: comment,
        timestamp: serverTimestamp(),
      };
      await addDoc(collection(db, "posts", postId, "comments"), commentData);
      setComment("");
    } catch (error) {
      console.error("Error adding comment:", error);
    }
  };

  const handleKeyDown = (e) => {
    if (!isMobile && e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mt-2 flex items-center">
      <input
        type="text"
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Write a comment..."
        className="flex-1 p-2 rounded bg-gray-800 text-white placeholder-gray-400"
      />
      {isMobile && (
        <button
          type="submit"
          className="ml-2 p-2 text-blue-400 hover:text-blue-600"
        >
          <FaPaperPlane size={20} />
        </button>
      )}
    </form>
  );
};

export default CommentForm;
