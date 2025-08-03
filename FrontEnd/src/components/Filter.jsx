import React from "react";
import "./Filter.css";

const filteroptions = [
  "All",
  "gamingplay",
  "music",
  "news",
  "Anime",
  "Coding",
  "javascript",
  "Current AFfairs",
  "Backend",
];
export default function Filter() {
  return (
    <div className="filter">
      {filteroptions.map((ele) => (
        <button className="filter-element">{ele}</button>
      ))}
    </div>
  );
}
