import React, { Fragment, useEffect, useRef, useState } from "react";
import VideoPlayer from "../components/VIdeoPlayer";
import "./video.css";
import Card from "../components/Card";
import { Link, useParams } from "react-router";
import LoadingSpinner from "../components/LoadingSpinner";
import { useSelector } from "react-redux";
import { WiSnow } from "react-icons/wi";

export default function Video() {
  const { id } = useParams();
  const [videoData, setVideoData] = useState(null);
  const [sidevideos, setSideVideos] = useState([]);
  const reduxSidevideo = useSelector((store) => store.videos.videos);
  const [loadingVideo, setLoadingVideo] = useState(true);
  const [loadingSide, setLoadingSide] = useState(true);

  // refs for height syncing
  const leftRef = useRef(null);
  const rightRef = useRef(null);
  const [width, setWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    // Function to set height from left section
    function matchHeight() {
      if (leftRef.current && rightRef.current) {
        rightRef.current.style.height = leftRef.current.offsetHeight + "px";
      }
    }

    // Use ResizeObserver to track height changes in first child
    const observer = new ResizeObserver(matchHeight);
    if (leftRef.current) {
      observer.observe(leftRef.current);
    }

    // Cleanup
    return () => observer.disconnect();
  }, []);

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
      <div className="videoPage-left-section" ref={leftRef}>
        {loadingVideo ? (
          <LoadingSpinner />
        ) : (
          <VideoPlayer videodata={videoData} />
        )}
      </div>

      <div className="video-list" ref={rightRef}>
        {loadingSide ? (
          <LoadingSpinner />
        ) : (
          sidevideos
            .filter((ele) => ele._id != id)
            .map((ele) => (
              <Fragment key={ele._id}>
                {width > 1010 && <Card videodata={ele} smaller={true} />}
                {width <= 1010 && <Card videodata={ele} />}
              </Fragment>
            ))
        )}
      </div>
    </div>
  );
}
