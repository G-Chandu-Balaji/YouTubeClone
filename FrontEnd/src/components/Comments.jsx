import React, { useCallback, useEffect, useState } from "react";
import CommentItem from "./commentItem";
import AddComment from "./AddComment";
import LoadingSpinner from "./LoadingSpinner";

function Comments({ _id }) {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchComments = useCallback(async () => {
    try {
      setLoading(true);
      const res = await fetch(`http://localhost:5000/api/comments/${_id}`);
      const data = await res.json();
      setComments(Array.isArray(data.comments) ? data.comments : []);
    } catch (err) {
      console.error("Failed to load comments:", err);
    } finally {
      setLoading(false);
    }
  }, [_id]);

  // Initial load
  useEffect(() => {
    fetchComments();
  }, [fetchComments]);

  // Handle delete or update from child
  const handleCommentChange = () => {
    fetchComments(); // re-fetch when something changes
  };

  return (
    <>
      <h3>{comments.length} Comments</h3>
      <AddComment videoId={_id} onCommentAdded={fetchComments} />
      {loading ? (
        <LoadingSpinner />
      ) : (
        <div>
          {comments.map((ele) => (
            <CommentItem
              data={ele}
              key={ele._id}
              onCommentUpdated={handleCommentChange}
              onCommentDeleted={handleCommentChange}
            />
          ))}
        </div>
      )}
    </>
  );
}

export default Comments;
