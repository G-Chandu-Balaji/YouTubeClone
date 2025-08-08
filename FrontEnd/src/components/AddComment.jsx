import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./AddComment.css";
import { useSelector } from "react-redux";

export default function AddComment({ videoId, onCommentAdded }) {
  const [text, setText] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const navigate = useNavigate();
  const { profileImage } = useSelector((store) => store.user);

  const token = localStorage.getItem("token"); // 🔐 Check user sign-in

  const handleAddComment = async () => {
    if (!text.trim()) return;

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
      console.log("videoId", videoId);
      console.log("response of adding commment", data);
      setText("");
      onCommentAdded(); // 🔄 Refresh comment list
    } catch (err) {
      console.error("Error adding comment:", err.message);
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

          <button onClick={handleAddComment}>Comment</button>
        </div>
      </div>
    </div>
  );
}
