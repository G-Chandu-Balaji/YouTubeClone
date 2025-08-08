import React, { Fragment, useEffect, useState } from "react";
import VideoPlayer from "../components/VIdeoPlayer";
import "./video.css";
import Card from "../components/Card";
import { Link, useParams } from "react-router";
import LoadingSpinner from "../components/LoadingSpinner";
import { useSelector } from "react-redux";

export default function Video() {
  const { id } = useParams();
  const [videoData, setVideoData] = useState(null);
  const [sidevideos, setSideVideos] = useState([]);
  const reduxSidevideo = useSelector((store) => store.videos.videos);
  const [loadingVideo, setLoadingVideo] = useState(true);
  const [loadingSide, setLoadingSide] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        setLoadingVideo(true);
        const res = await fetch(`http://localhost:5000/api/video/${id}`);
        const data = await res.json();
        if (!data) throw new Error("Video data not found");
        setVideoData(data);
      } catch (err) {
        console.error("Error fetching video:", err.message);
      } finally {
        setLoadingVideo(false);
      }
    }

    if (id) {
      fetchData();
    }
  }, [id]);

  useEffect(() => {
    if (reduxSidevideo?.length > 0) {
      setSideVideos(reduxSidevideo);
      setLoadingSide(false);
    } else {
      async function getSideVideos() {
        try {
          setLoadingSide(true);
          const res = await fetch("http://localhost:5000/api/video");
          const data = await res.json();
          setSideVideos(data);
        } catch (err) {
          console.log("Error fetching side videos:", err.message);
        } finally {
          setLoadingSide(false);
        }
      }
      getSideVideos();
    }
  }, [reduxSidevideo]);

  // if (loadingVideo) {
  //   return (
  //     <div>
  //       <LoadingSpinner />
  //     </div>
  //   );
  // }

  // if (!videoData) {
  //   return (
  //     <div>
  //       <LoadingSpinner />
  //     </div>
  //   );
  // }

  return (
    <div className="videoPage">
      <div className="videoPage-left-section">
        {loadingVideo ? (
          <LoadingSpinner />
        ) : (
          <VideoPlayer videodata={videoData} />
        )}
      </div>

      <div className="video-list">
        {loadingSide ? (
          <LoadingSpinner />
        ) : (
          sidevideos
            .filter((ele) => ele._id != id)
            .map((ele) => (
              <Fragment key={ele._id}>
                <Card videodata={ele} smaller={true} />
              </Fragment>
            ))
        )}
      </div>
    </div>
  );
}
