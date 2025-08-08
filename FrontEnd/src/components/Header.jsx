import "./Header.css";
import { Link, useNavigate } from "react-router";
import { useSelector } from "react-redux";
import { useState } from "react";

export default function Header({ setIsOpen }) {
  const { currentUser, profileImage } = useSelector((store) => store.user);
  console.log("in header ", currentUser, profileImage);
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  let isSignin = currentUser ? true : false;

  function handleSearch(e) {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/search?q=${encodeURIComponent(query)}`);
    }
  }

  return (
    <header className="header-container">
      <nav className="header-nav-container">
        <div id="left">
          <div onClick={() => setIsOpen((prev) => !prev)}>
            <img src="/list.png" alt="list-icon" height={30} width={30} />
          </div>

          <Link to="/">
            <div className="logo">
              <img src="/youtube.png" alt="logo" width={35} height={35} />
              <h3>YouTube</h3>
            </div>
          </Link>
        </div>
        <div id="center">
          <div className="search-bar">
            <input
              type="text"
              placeholder="search for videos..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            <button onClick={handleSearch}>
              <img src="/search.png" alt="search-icon" width={30} height={30} />
            </button>
          </div>
          <div className="mic-icon">
            <img src="/mic.png" alt="mic-logo" height={38} width={38} />
          </div>
        </div>
        <div className="right-icons">
          {isSignin ? (
            <div className="after-sigin">
              <div className="sigin">
                <img
                  src="/pluslogo.png"
                  alt="user-icon"
                  width={25}
                  height={25}
                />
                <Link to="/">
                  <span>Create</span>
                </Link>
              </div>
              <div className="sigin">
                <img
                  src={profileImage}
                  alt="user-icon"
                  width={30}
                  height={30}
                />
                <span>
                  <Link to="/login">{currentUser}</Link>
                </span>
              </div>
            </div>
          ) : (
            <div className="sigin">
              <img src="/user.png" alt="user-icon" width={30} height={30} />
              <Link to="/login">
                <span>Sign-in</span>
              </Link>
            </div>
          )}
        </div>
      </nav>
    </header>
  );
}
