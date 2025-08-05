import React from "react";
import "./Filter.css";

const filteroptions = [
  "All",
  "gameplay",
  "music",
  "news",
  "Anime",
  "Coding",
  "javascript",
  "Current AFfairs",
  "Backend",
];
export default function Filter({ SetFiltername, filtername }) {
  function handleSearch(ele) {
    SetFiltername(ele);
  }
  return (
    <div className="filter">
      {filteroptions.map((ele) => (
        <button
          key={ele}
          onClick={() => handleSearch(ele)}
          className={`filter-element ${filtername === ele ? "active" : ""}`}
        >
          {ele}
        </button>
      ))}
    </div>
  );
}
