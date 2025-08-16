import React from "react";
import "./Sidebar.css";
import { Link, NavLink } from "react-router";

export default function Sidebar({ isOpen, closeSidebar }) {
  return (
    <>
      {isOpen ? (
        <aside className="mini-sidebar">
          <ul>
            <NavLink
              to="/"
              className={({ isActive }) => (isActive ? "active-link" : "")}
            >
              <li>
                <img src="/home.png" alt="home" width={20} height={20} />
                <span>Home</span>
              </li>
            </NavLink>
            <li>
              <img src="/shorts.png" alt="home" width={20} height={20} />
              <span>Shorts</span>
            </li>
            <li>
              <img src="/subscribe.png" alt="home" width={20} height={20} />
              <span>Subscriptions</span>
            </li>
            {isOpen && (
              <li>
                <img src="/subscribe.png" alt="home" width={20} height={20} />
                <span>You</span>
              </li>
            )}
          </ul>
        </aside>
      ) : (
        <aside
          className={`sidebar 
           
      `}
        >
          <ul>
            <NavLink
              to="/"
              className={({ isActive }) => (isActive ? "active-link" : "")}
            >
              <li>
                <img src="/home.png" alt="home" width={20} height={20} />
                <span>Home</span>
              </li>
            </NavLink>
            <li>
              <img src="/shorts.png" alt="home" width={20} height={20} />
              <span>Shorts</span>
            </li>
            <li>
              <img src="/subscribe.png" alt="home" width={20} height={20} />
              <span>Subscriptions</span>
            </li>
            {isOpen && (
              <li>
                <img src="/subscribe.png" alt="home" width={20} height={20} />
                <span>You</span>
              </li>
            )}
          </ul>
          <div className="">
            <div className="category-heading">You </div>

            <ul>
              <li>
                <img src="/history.png" alt="home" width={20} height={20} />
                <span>History</span>
              </li>
              <li>
                <img src="/playlist.png" alt="home" width={20} height={20} />
                <span>Playlist</span>
              </li>
              <li>
                <img src="/youtube1.png" alt="home" width={20} height={20} />
                <span>Your videos</span>
              </li>
              <li>
                <img src="/clock.png" alt="home" width={20} height={20} />
                <span>Watch Later</span>
              </li>
              <li>
                <img src="/like.png" alt="home" width={20} height={20} />
                <span>Liked Videos</span>
              </li>
            </ul>
          </div>
          <div className="">
            <div className="category-heading">Explore</div>

            <ul>
              <li>
                <img src="/trending.png" alt="home" width={20} height={20} />
                <span>Trending</span>
              </li>
              <li>
                <img src="/bag.png" alt="home" width={20} height={20} />
                <span>Shopping</span>
              </li>
              <li>
                <img
                  src="/musical-note.png"
                  alt="home"
                  width={20}
                  height={20}
                />
                <span>Musics</span>
              </li>
              <li>
                <img src="/video.png" alt="home" width={20} height={20} />
                <span>Movies</span>
              </li>
              <li>
                <img src="/stream.png" alt="home" width={20} height={20} />
                <span>Live</span>
              </li>
              <li>
                <img src="/trophy.png" alt="home" width={20} height={20} />
                <span>Gaming</span>
              </li>
              <li>
                <img src="/console.png" alt="home" width={20} height={20} />
                <span>News</span>
              </li>
              <li>
                <img src="/trophy.png" alt="home" width={20} height={20} />
                <span>Sports</span>
              </li>
              <li>
                <img src="/learning.png" alt="home" width={20} height={20} />
                <span>Courses</span>
              </li>
              <li>
                <img src="/fashion.png" alt="home" width={20} height={20} />
                <span>Fashion & beauty</span>
              </li>
              <li>
                <img src="/podcast.png" alt="home" width={20} height={20} />
                <span>Podcast</span>
              </li>
            </ul>
          </div>
        </aside>
      )}
    </>
  );
}
