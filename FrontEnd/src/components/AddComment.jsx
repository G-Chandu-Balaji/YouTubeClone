import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./AddComment.css";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";
import LoadingSpinner from "./LoadingSpinner";

export default function AddComment({ videoId, onCommentAdded }) {
  const [text, setText] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { profileImage } = useSelector((store) => store.user);

  const token = localStorage.getItem("token"); // 🔐 Check user sign-in

  const handleAddComment = async () => {
    if (!text.trim()) return;
    setLoading(true);
    try {
      const res = await fetch(`http://localhost:5000/api/comments/${videoId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ text }),
      });

      const data = await res.json();
      if (!res.ok) {
        setLoading(false);
        toast.error(data.error || "Something went wrong");
        return;
      }
      if (data.text) {
        onCommentAdded();
        toast.success("Comment added");
        setText("");
      }
      console.log("videoId", videoId);
      console.log("response of adding commment", data);
    } catch (err) {
      toast.error("Network error. Please try again.");

      console.error("Error adding comment:", err.message);
    } finally {
      setLoading(false);
    }
  };

  // 👇 Show login prompt if not logged in
  if (!token) {
    return (
      <div className="sign-in-to-comment">
        <p>
          You must be <span onClick={() => navigate("/login")}>signed in</span>{" "}
          to comment.
        </p>
      </div>
    );
  }

  return (
    <div className="commentItem-container1">
      <div className="userimage-container1">
        <img src={profileImage} alt="logo" />
      </div>
      <div className="add-comment-container">
        <input
          type="text"
          placeholder="Add a comment..."
          value={text}
          onFocus={() => setIsFocused(true)}
          onChange={(e) => setText(e.target.value)}
        />

        <div
          className="comment-buttons"
          style={{ visibility: isFocused ? "visible" : "hidden" }}
        >
          <button onClick={() => setIsFocused(false)}>Cancel</button>

          <button onClick={handleAddComment} disabled={loading}>
            {" "}
            {loading ? <LoadingSpinner size={20} /> : "Comment"}
          </button>
        </div>
      </div>
    </div>
  );
}
