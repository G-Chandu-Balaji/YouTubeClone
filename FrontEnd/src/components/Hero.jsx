import React, { useEffect, useState } from "react";
import "./Hero.css";
import Card from "./Card";
import { Link } from "react-router";

export default function Hero({ filtername }) {
  const [videos, setVideos] = useState([]);
  const [filteredVideos, setFilteredVideos] = useState([]);

  useEffect(() => {
    async function getData() {
      try {
        let res = await fetch("http://localhost:5000/api/video");
        let data = await res.json();
        setVideos(data);
        setFilteredVideos(data); // initially show all videos
      } catch (err) {
        console.log("error", err.message);
      }
    }
    getData();
  }, []);

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
    <div className="hero-container">
      {filteredVideos.map((ele) => (
        <Card key={ele._id} videodata={ele} />
      ))}
    </div>
  );
}
