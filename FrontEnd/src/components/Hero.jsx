import React, { useEffect, useState } from "react";
import "./Hero.css";
import Card from "./Card";
import { Link } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { addVideos } from "../utils/videoSlice";
import LoadingSpinner from "./LoadingSpinner";

export default function Hero({ filtername }) {
  const dispatch = useDispatch();
  const [videos, setVideos] = useState([]);
  const [filteredVideos, setFilteredVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const existingVideos = useSelector((store) => store.videos.videos);

  useEffect(() => {
    async function getData() {
      if (existingVideos.length > 0) {
        console.log("data from redux no fetchig");
        setVideos(existingVideos);
        setFilteredVideos(existingVideos);
        setLoading(false);
        return;
      }
      try {
        let res = await fetch("http://localhost:5000/api/video");
        let data = await res.json();
        setVideos(data);
        setFilteredVideos(data);
        console.log("dispatched data", data);
        dispatch(addVideos(data));
      } catch (err) {
        console.log("error", err.message);
      } finally {
        setLoading(false);
      }
    }
    getData();
  }, [existingVideos, dispatch]);

  useEffect(() => {
    if (filtername === "" || filtername === "All") {
      setFilteredVideos(videos);
      console.log(videos);
    } else {
      const lowerFilter = filtername.toLowerCase();
      const newVideos = videos.filter((ele) => {
        const titleMatch = ele.title?.toLowerCase().includes(lowerFilter);
        const tagMatch = ele.tags?.some(
          (tag) => tag.toLowerCase() === lowerFilter
        );
        return titleMatch || tagMatch;
      });

      setFilteredVideos(newVideos);
      console.log("newvideos", newVideos);
    }
  }, [filtername, videos]);

  return (
    <>
      {loading ? (
        <LoadingSpinner />
      ) : (
        <>
          {filteredVideos.length === 0 ? (
            <div className="no-results">No videos found</div>
          ) : (
            <div className="hero-container">
              {filteredVideos.map((ele) => (
                <Card key={ele._id} videodata={ele} />
              ))}
            </div>
          )}
        </>
      )}
    </>
  );
}
