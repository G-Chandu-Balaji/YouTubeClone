import React from "react";
import "./Hero.css";
import Card from "./Card";
import { Link } from "react-router";
const data = [
  {
    videoId: "video01",
    title: "Learn React in 30 Minutes",
    thumbnailUrl:
      "https://marketplace.canva.com/EAEqfS4X0Xw/1/0/1600w/canva-most-attractive-youtube-thumbnail-wK95f3XNRaM.jpg",
    channelId: "channel01",
    uploader: "user01",
    views: 15200,
    likes: 1023,
    dislikes: 45,
    uploadDate: "2024-09-20",
    comments: [
      {
        commentId: "comment01",
        userId: "user02",
        text: "Great video! Very helpful.",
        timestamp: "2024-09-21T08:30:00Z",
      },
    ],
  },
  {
    videoId: "video02",
    title: "Learn React in 30 Minutes",
    thumbnailUrl:
      "https://i.pinimg.com/736x/5a/2e/37/5a2e373fb15805b2869e86a7dec7a1a4.jpg",
    description: "A quick tutorial to get started with React.",
    channelId: "channel01",
    uploader: "user01",
    views: 15200,
    likes: 1023,
    dislikes: 45,
    uploadDate: "2024-09-20",
    comments: [
      {
        commentId: "comment01",
        userId: "user02",
        text: "Great video! Very helpful.",
        timestamp: "2024-09-21T08:30:00Z",
      },
    ],
  },
  {
    videoId: "video03",
    title: "Learn React in 30 Minutes",
    thumbnailUrl:
      "https://marketplace.canva.com/EAEqfS4X0Xw/1/0/1600w/canva-most-attractive-youtube-thumbnail-wK95f3XNRaM.jpg",
    channelId: "channel01",
    uploader: "user01",
    views: 15200,
    likes: 1023,
    dislikes: 45,
    uploadDate: "2024-09-20",
    comments: [
      {
        commentId: "comment01",
        userId: "user02",
        text: "Great video! Very helpful.",
        timestamp: "2024-09-21T08:30:00Z",
      },
    ],
  },
  {
    videoId: "video04",
    title: "Learn React in 30 Minutes",
    thumbnailUrl:
      "https://i.pinimg.com/736x/5a/2e/37/5a2e373fb15805b2869e86a7dec7a1a4.jpg",
    description: "A quick tutorial to get started with React.",
    channelId: "channel01",
    uploader: "user01",
    views: 15200,
    likes: 1023,
    dislikes: 45,
    uploadDate: "2024-09-20",
    comments: [
      {
        commentId: "comment01",
        userId: "user02",
        text: "Great video! Very helpful.",
        timestamp: "2024-09-21T08:30:00Z",
      },
    ],
  },
];

export default function Hero() {
  return (
    <div className="hero-container">
      {data.map((ele) => (
        <Link
          to={`/watch/:${ele.videoId}`}
          style={{ textDecoration: "none", color: "inherit" }}
        >
          <Card videodata={ele} />
        </Link>
      ))}
    </div>
  )
}
