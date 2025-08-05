import React, { Fragment, useEffect, useState } from "react";
import VideoPlayer from "../components/VIdeoPlayer";
import "./video.css";
import Card from "../components/Card";
import { Link, useParams } from "react-router";

export default function Video() {
  const { id } = useParams();
  const [videoData, setVideoData] = useState(null);
  const [sidevideos, setSideVideos] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch(`http://localhost:5000/api/video/${id}`);
        const data = await res.json();
        if (!data) throw new Error("Video data not found");
        setVideoData(data);
      } catch (err) {
        console.error("Error fetching video:", err.message);
      }
    }

    if (id) {
      fetchData();
    }
  }, [id]);

  useEffect(() => {
    async function getSideVideos() {
      try {
        const res = await fetch("http://localhost:5000/api/video");
        const data = await res.json();
        setSideVideos(data);
      } catch (err) {
        console.log("Error fetching side videos:", err.message);
      }
    }

    getSideVideos();
  }, []);

  if (!videoData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="videoPage">
      <div className="videoPage-left-section">
        <VideoPlayer videodata={videoData} />
      </div>

      <div className="video-list">
        {sidevideos.map((ele) => (
          <Fragment key={ele._id}>
            <Card videodata={ele} smaller={true} />
          </Fragment>
        ))}
      </div>
    </div>
  );
}
