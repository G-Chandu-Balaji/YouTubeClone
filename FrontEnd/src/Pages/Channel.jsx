import React from "react";
import { Link, useOutletContext } from "react-router";
import Sidebar from "../components/Sidebar";
import "./Channel.css";
import Card from "../components/Card";

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
];

export default function Channel() {
  const isOpen = useOutletContext();

  return (
    <div className="channel-layout">
      <div className={`left-section ${isOpen ? "mini-leftsection" : ""}`}>
        <Sidebar isOpen={isOpen} />
      </div>
      <div className="channel-section">
        <div className="channel-banner">banner</div>
        <div className="channel-info">
          <div className="channel-user">
            <img
              src="https://yt3.ggpht.com/pZQ5JMD4EOI8TcNYAPTzMexe_fC0CKnb_hYlV4rPfIzmDidF239fH1XKmzkeT30XSg7fxNwc_w=s88-c-k-c0x00ffffff-no-rj"
              alt=""
              height={150}
              width={150}
            />
          </div>
          <div className="channel-info-right-section">
            <h2>Title</h2>
            <div className="channel-info-details">
              <span>
                <strong>dfhejsdfs</strong>
              </span>
              <span>1.67M sunscribers</span>
              <span>331 videos</span>
            </div>
            <div>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Non sed
              sequi, itaque doloribus dolor culpa, reprehenderit expedita
              ducimus facere amet
            </div>
            <div className="channel-info-buttons">
              <button>Subscribe</button>
              <button>Join</button>
            </div>
          </div>
        </div>
        <div>
          <div className="channel-nav">
            <li>home</li>
            <li>videos</li>
            <li>shorts</li>
            <li>live</li>
            <li>playlsit</li>
          </div>
          <hr />
        </div>
        <div className="channel-videos">
          {data.map((ele) => (
            <Link
              to={`/watch/:${ele.videoId}`}
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <Card videodata={ele} medium={true} />
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
