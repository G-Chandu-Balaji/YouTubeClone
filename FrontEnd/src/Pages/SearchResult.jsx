import React, { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router";
import "./SearchResult.css";
import Card from "../components/Card";

function SearchResult() {
  const [resultVideos, setResultVideos] = useState([]);
  const [searchParams] = useSearchParams();
  const query = searchParams.get("q");
  const [width, setWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    async function FetchResult() {
      try {
        const res = await fetch(
          `http://localhost:5000/api/video/search?q=${query}`
        );
        const data = await res.json();
        console.log(data);
        setResultVideos(data);
      } catch (err) {
        console.error("Search error", err);
      }
    }
    if (query) FetchResult();
  }, [query]);
  return (
    <div className="result-container">
      <div className="result-video-list">
        {resultVideos.map((ele) => (
          <Card videodata={ele} larger={width > 460} />
        ))}
      </div>
    </div>
  );
}

export default SearchResult;
