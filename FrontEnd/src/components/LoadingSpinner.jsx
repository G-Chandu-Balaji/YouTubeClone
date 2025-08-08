import React from "react";
import "./LoadingSpinner.css";

function LoadingSpinner({ size = 50 }) {
  return (
    <div className="spinner-container">
      <div className="spinner" style={{ width: size, height: size }}></div>
    </div>
  );
}

export default LoadingSpinner;
