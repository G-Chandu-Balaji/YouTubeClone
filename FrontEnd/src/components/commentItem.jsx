import React, { useState } from "react";
import "./commentItem.css";
import { formatDistanceToNow } from "date-fns";
import toast from "react-hot-toast";
import LoadingSpinner from "./LoadingSpinner";

export default function CommentItem({
  data,

  onCommentUpdated,
  onCommentDeleted,
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(data.text);
  const { profileImage, username } = data.userId;
  const [editoptions, setEditOptions] = useState(false);

  const [editLoading, setEditLoading] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);

  const timeAgo = formatDistanceToNow(new Date(data.createdAt), {
    addSuffix: true,
  });

  const token = localStorage.getItem("token"); // 🔐 Check user sign-in

  function handleOptions() {
    setEditOptions(!editoptions);
    setIsEditing(false);
  }

  async function OnEdit(id, text) {
    setEditLoading(true);
    try {
      const res = await fetch(`http://localhost:5000/api/comments/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          text: text,
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        toast.error(data.error || "Something went wrong");

        return;
      }
      if (data.text) {
        onCommentUpdated();
        toast.success("Comment updated");
      }
      console.log("adding the comment", data);
    } catch (err) {
      toast.error("Network error. Please try again.");

      console.log("Error", err.message);
    } finally {
      setEditLoading(false);
    }
  }

  async function handleDelete(id) {
    setDeleteLoading(true);
    try {
      const res = await fetch(`http://localhost:5000/api/comments/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await res.json();
      if (!res.ok) {
        toast.error(data.error || "Something went wrong");
        setEditOptions(false);
        return;
      }
      if (data.comment) {
        onCommentDeleted();
        toast.success("Comment Deleted");
      }
      console.log("Deleted comment", data);
    } catch (err) {
      toast.error("Network error. Please try again.");
      console.error("Delete Error", err.message);
    } finally {
      setDeleteLoading(false);
    }
  }
  const handleEditSave = () => {
    const trimmed = editText.trim();
    if (!trimmed) return;
    OnEdit(data._id, trimmed);
    setIsEditing(false);
    setEditOptions(false);
  };

  return (
    <div className="commentItem-container">
      <div className="userimage-container">
        <img src={profileImage} alt="" />
      </div>
      <div className="comment-right-section">
        <div className="comment-head">
          <div className="comment-user">@{username}</div>
          <span>{timeAgo}</span>
        </div>

        {isEditing ? (
          <div className="edit-textbox">
            <input
              value={editText}
              onChange={(e) => setEditText(e.target.value)}
            />
            <button onClick={handleEditSave} disabled={editLoading}>
              {editLoading ? <LoadingSpinner size={20} /> : "Save"}
            </button>
            <button
              onClick={() => {
                setIsEditing(false), setEditOptions(false);
              }}
            >
              Cancel
            </button>
          </div>
        ) : (
          <div>{data.text}</div>
        )}

        <div className="comment-like-container">
          <div>
            <img src="/like.png" alt="like" height={20} width={20} />
            <p>4</p>
          </div>
          <div>
            <img src="/dislike.png" alt="like" height={20} width={20} />
            <p>1</p>
          </div>
        </div>
      </div>
      <div className="edit-container">
        <p onClick={handleOptions}>:</p>
        {editoptions ? (
          <div className="edit-options ">
            <div onClick={() => setIsEditing(!isEditing)}>edit</div>
            <div onClick={() => handleDelete(data._id)}>
              {deleteLoading ? <LoadingSpinner size={20} /> : "delete"}
            </div>
          </div>
        ) : (
          ""
        )}
      </div>
    </div>
  );
}
