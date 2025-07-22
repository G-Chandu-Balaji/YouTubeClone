import React from "react";
import "./VidePlayer.css";
import CommentItem from "./commentItem";

const mockData = {
  videoId: "dQw4w9WgXcQ",
  title: "Learn React in 30 Minutes",
  uploader: "CodeWithBalaji",
  imageUser:
    "https://yt3.ggpht.com/pZQ5JMD4EOI8TcNYAPTzMexe_fC0CKnb_hYlV4rPfIzmDidF239fH1XKmzkeT30XSg7fxNwc_w=s88-c-k-c0x00ffffff-no-rj",
  views: 15200,
  likes: 1023,
  uploadDate: "2024-09-20",
  description: "A quick tutorial to get started with React.",
  comments: [
    {
      commentId: "c1",
      userId: "user01",
      text: "Great video! Very helpful.",
      timestamp: "2024-09-21T08:30:00Z",
    },
    {
      commentId: "c2",
      userId: "user01",
      text: "Great video! Very helpful.",
      timestamp: "2024-09-21T08:30:00Z",
    },
    {
      commentId: "c3",
      userId: "user01",
      text: "Great video! Very helpful.",
      timestamp: "2024-09-21T08:30:00Z",
    },
    {
      commentId: "c4",
      userId: "user01",
      text: "Great video! Very helpful.",
      timestamp: "2024-09-21T08:30:00Z",
    },
  ],
};

export default function VIdeoPlayer() {
  const {
    title,
    views,
    likes,
    description,
    comments,
    uploader,
    uploadDate,
    imageUser,
  } = mockData;
  return (
    <div class2Name="video-section">
      <div className="video-container">
        <video src="/testvideo.mp4" autoPlay></video>
      </div>
      <h3 className="video-section-video-title">{title}</h3>
      <div className="middle-section">
        <div className="middle-left-section">
          <div className="uploader-image-container">
            <img src={imageUser} alt="" />
          </div>
          <div className="">
            <div>{uploader}</div>
            <div>50M</div>
          </div>
          <button>Subscribe</button>
        </div>

        <div className="middle-right-section">
          <div className="like-container">
            <div className="flex-div">
              <img src="/like.png" alt="like" height={20} width={20} />
              <p>{likes}</p>
            </div>
            <div className="flex-div">
              <img src="/dislike.png" alt="like" height={20} width={20} />
              <p>1</p>
            </div>
          </div>
          <div className="option-container">
            <img src="/share.png" alt="like" height={20} width={20} />
            <p>share</p>
          </div>
          <div className="option-container">
            <img src="/download.png" alt="like" height={20} width={20} />
            <p>Download</p>
          </div>
        </div>
      </div>
      <div className="description-section">
        {/* <div className=""> */}
        <p>
          {views} Views {uploadDate}{" "}
        </p>

        {/* </div> */}
        <div>{description}</div>
      </div>
      <hr />
      <div>
        <h3>{comments.length} Comments</h3>
        <div>
          {comments.map((ele) => (
            <CommentItem data={ele} key={ele.commentId} />
          ))}
        </div>
      </div>
    </div>
  );
}
