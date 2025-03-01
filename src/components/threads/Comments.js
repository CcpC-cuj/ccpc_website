import React, { useEffect, useState } from "react";
import { collection, query, orderBy, onSnapshot } from "firebase/firestore";
import { db } from "../../threadsFirebaseConfig";

const Comments = ({ postId }) => {
  const [comments, setComments] = useState([]);
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    const commentsRef = collection(db, "posts", postId, "comments");
    const q = query(commentsRef, orderBy("timestamp", "asc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const fetchedComments = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setComments(fetchedComments);
    });
    return () => unsubscribe();
  }, [postId]);

  const displayedComments = showAll ? comments : comments.slice(0, 3);

  return (
    <div className="mt-2">
      {displayedComments.map((comment) => (
        <div key={comment.id} className="text-sm text-gray-400">
          <strong>{comment.author}:</strong> {comment.content}
        </div>
      ))}
      {comments.length > 3 && !showAll && (
        <button
          onClick={() => setShowAll(true)}
          className="text-xs text-blue-400 hover:text-blue-600 mt-1"
        >
          View All Comments
        </button>
      )}
    </div>
  );
};

export default Comments;
