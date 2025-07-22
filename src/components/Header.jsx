import React from "react";
import "./Header.css";
import { Link } from "react-router";

export default function Header({ setIsOpen }) {
  return (
    <header className="header-container">
      <nav className="header-nav-container">
        <div id="left">
          <div onClick={() => setIsOpen((prev) => !prev)}>
            <img src="/list.png" alt="list-icon" height={30} width={30} />
          </div>

          <div className="logo">
            <img src="/youtube.png" alt="logo" width={35} height={35} />
            <h3>YouTube</h3>
          </div>
        </div>
        <div id="center">
          <div className="search-bar">
            <input type="text" placeholder="search for videos..." />
            <button>
              <img src="/search.png" alt="search-icon" width={30} height={30} />
            </button>
          </div>
          <div className="mic-icon">
            <img src="/mic.png" alt="mic-logo" height={38} width={38} />
          </div>
        </div>
        <div className="right-icons">
          <div className="sigin">
            <img src="/user.png" alt="user-icon" width={30} height={30} />
            <Link to="/login">
              <span>Sign-in</span>
            </Link>
          </div>
        </div>
      </nav>
    </header>
  );
}
