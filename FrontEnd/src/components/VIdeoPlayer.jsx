import React, { useState } from "react";
import "./VidePlayer.css";
import CommentItem from "./commentItem";
import { BiFullscreen } from "react-icons/bi";
import ReactPlayer from "react-player";
import { Link } from "react-router";
import { formatDistanceToNow } from "date-fns";
import FormatNumbers from "../utils/formatnumbers";
import Comments from "./Comments";
import AddComment from "./AddComment";

export default function VIdeoPlayer({ videodata }) {
  const [expanded, setExpanded] = useState(false);

  console.log(videodata);
  const {
    title,
    videoUrl,
    channelId,
    likes,
    dislikes,
    views,
    createdAt,
    description,
    _id,
  } = videodata;
  let Id = videoUrl.split("/embed/")[1];
  console.log(title, videoUrl, Id);
  const timeAgo = formatDistanceToNow(new Date(createdAt), {
    addSuffix: true,
  });

  return (
    <div className="video-section">
      <div className="video-container">
        <ReactPlayer
          src={`https://www.youtube.com/watch?v=${Id}`}
          controls
          width="100%"
          height="100%"
        />
      </div>
      <h3 className="video-section-video-title">{title}</h3>
      <div className="middle-section">
        <div className="middle-left-section">
          <div className="uploader-image-container">
            <img src={channelId.channelImage} alt="" />
          </div>
          <div className="">
            <div>
              <Link to={`/channel/${channelId._id}`}>{channelId.name}</Link>
            </div>
            <div>{FormatNumbers(channelId.subscribers)} subscribers</div>
          </div>
          <button>Subscribe</button>
        </div>

        <div className="middle-right-section">
          <div className="like-container">
            <div className="flex-div">
              <img src="/like.png" alt="like" height={20} width={20} />
              <p>{FormatNumbers(likes)}</p>
            </div>
            <div className="flex-div">
              <img src="/dislike.png" alt="like" height={20} width={20} />
              <p>{dislikes}</p>
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
          {views.toLocaleString()} Views {timeAgo}{" "}
        </p>

        <div className={`video-description ${expanded ? "expanded" : ""}`}>
          {description}
        </div>
        <button className="text-button" onClick={() => setExpanded(!expanded)}>
          {expanded ? "Show less" : "Show more"}
        </button>
      </div>
      <hr />
      <div>
        <Comments _id={_id} />
      </div>
    </div>
  );
}
