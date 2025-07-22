import React from "react";
import "./Card.css";
import TimeAgo from "../utils/Timefunction,js";

export default function Card({ videodata, smaller }) {
  const { title, thumbnailUrl, channelId, uploader, views, uploadDate } =
    videodata;

  return (
    <div className={`card-container ${smaller ? "smaller" : ""}`}>
      <div className="top">
        <img src={thumbnailUrl} alt="thumbnail" />
      </div>
      <div className="bottom">
        <div className="channel-img">{uploader}</div>
        <div className="video-info">
          <div className="video-title">{title}</div>
          <div className="video-channel">{channelId}</div>
          <div className="info">
            <div>{views} views</div>
            <div>{TimeAgo(uploadDate)}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
