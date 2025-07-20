import React from "react";
import "./Filter.css";

const filteroptions = ["All", "gaming", "music", "news", "trending"];
export default function Filter() {
  return (
    <div className="filter">
      {filteroptions.map((ele) => (
        <button className="filter-element">{ele}</button>
      ))}
    </div>
  );
}
