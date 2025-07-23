import React from "react";
import "./commentItem.css";

export default function CommentItem({ data }) {
  const isActive = false;
  return (
    <div className="commentItem-container">
      <div className="userimage-container">
        <img
          src="https://yt3.ggpht.com/ytc/AIdro_lEhhB_Ta9W2SpUFJa7OK4dnN9xrefvFGu_8UiFRe2xGOw=s88-c-k-c0x00ffffff-no-rj"
          alt=""
        />
      </div>
      <div className="comment-right-section">
        <div className="comment-head">
          <div className="comment-user">{data.userId}</div>
          <span>{data.timestamp}</span>
        </div>
        <div>{data.text}</div>

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
        <p>:</p>
        {isActive ? (
          <div className="edit-options ">
            <div>edit</div>
            <div>delete</div>
          </div>
        ) : (
          ""
        )}
      </div>
    </div>
  );
}
