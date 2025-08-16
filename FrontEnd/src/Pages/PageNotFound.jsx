import React from "react";
import "./PageNotFound.css";
import { Link } from "react-router";

function PageNotFound() {
  return (
    <div className="yt-error-page">
      <img
        src="/youtubeerror.png"
        alt="Page not found"
        className="yt-error-image"
      />
      <h2>This page isn’t available.</h2>
      <p className="yt-error-text">
        The link you followed may be broken, or the page may have been removed.
      </p>
      <Link to="/" className="yt-home-button">
        Go to YouTube Home
      </Link>
    </div>
  );
}

export default PageNotFound;
