import React, { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router";
import "./SearchResult.css";
import Card from "../components/Card";

function SearchResult() {
  const [resultVideos, setResultVideos] = useState([]);
  const [searchParams] = useSearchParams();
  const query = searchParams.get("q");
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
          <Card videodata={ele} larger={true} />
        ))}
      </div>
    </div>
  );
}

export default SearchResult;
