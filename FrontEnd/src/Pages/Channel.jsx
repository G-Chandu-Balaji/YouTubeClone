import React, { useEffect, useState } from "react";
import { Link, useOutletContext, useParams } from "react-router";
import Sidebar from "../components/Sidebar";
import "./Channel.css";
import Card from "../components/Card";
import FormatNumbers from "../utils/formatnumbers";

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
  const { channelId } = useParams();
  const [channeldata, setChanneldata] = useState(null);
  const isOpen = useOutletContext();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getSideVideos() {
      try {
        const res = await fetch(
          `http://localhost:5000/api/channel/${channelId}`
        );
        const data = await res.json();
        setChanneldata(data);
      } catch (err) {
        console.log("Error fetching side videos:", err.message);
      } finally {
        setLoading(false);
      }
    }

    getSideVideos();
  }, [channelId]);

  if (loading) return <div>Loading...</div>;
  console.log("channeldata", channeldata);
  const { channel, videos } = channeldata;
  console.log(channel);

  return (
    <div className="channel-layout">
      <div className={`left-section ${isOpen ? "mini-leftsection" : ""}`}>
        <Sidebar isOpen={isOpen} />
      </div>
      <div className="channel-section">
        <div className="channel-banner">
          <img src={channel.bannerImage} alt="" />
        </div>
        <div className="channel-info">
          <div className="channel-user">
            <img src={channel.channelImage} alt="" height={150} width={150} />
          </div>
          <div className="channel-info-right-section">
            <h2>{channel.name}</h2>
            <div className="channel-info-details">
              <span>
                <strong>@{channel.name}</strong>
              </span>
              <span>{FormatNumbers(channel.subscribers)} subscribers</span>
              <span>{videos.length} videos</span>
            </div>
            <div>{channel.description}</div>
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
          {videos.map((ele) => (
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
