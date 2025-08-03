import React from "react";
import "./Card.css";
import TimeAgo from "../utils/Timefunction,js";
import FormatNumbers from "../utils/formatnumbers";

export default function Card({ videodata, smaller, medium }) {
  const { title, thumbnailUrl, channelId, views, createdAt } = videodata;
  const { channelImage, name } = channelId;
  return (
    <div
      className={`card-container ${smaller ? "smaller" : ""} ${
        medium ? "medium" : ""
      }`}
    >
      <div className="top">
        <img src={thumbnailUrl} alt="thumbnail" />
      </div>
      <div className="bottom">
        {!medium && (
          <div className="channel-img">
            <img src={channelImage} alt="" height={40} width={40} />
          </div>
        )}
        <div className="video-info">
          <div className="video-title">{title}</div>
          {!medium && <div className="video-channel">{name}</div>}
          <div className="info">
            <div>{FormatNumbers(views)} views</div>
            <div>{TimeAgo(createdAt)}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
