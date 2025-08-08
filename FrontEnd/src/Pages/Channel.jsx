import React, { useEffect, useState } from "react";
import { Link, useOutletContext, useParams } from "react-router";
import Sidebar from "../components/Sidebar";
import "./Channel.css";
import Card from "../components/Card";
import FormatNumbers from "../utils/formatnumbers";

export default function Channel() {
  const { channelId } = useParams();
  const [channeldata, setChanneldata] = useState(null);
  const isOpen = useOutletContext();
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("Home");

  // const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    async function getSideVideos() {
      try {
        const res = await fetch(
          `http://localhost:5000/api/channel/${channelId}`
        );
        const data = await res.json();
        setChanneldata(data);
      } catch (err) {
        console.log("Error fetching side videos:", err.message);
      } finally {
        setLoading(false);
      }
    }

    getSideVideos();
  }, [channelId]);

  if (loading) return <div>Loading...</div>;
  console.log("channeldata", channeldata);
  const { channel, videos } = channeldata;
  console.log(channel);

  return (
    <div className="channel-layout">
      <div className={`left-section ${isOpen ? "mini-leftsection" : ""}`}>
        <Sidebar isOpen={isOpen} />
      </div>
      <div className="channel-section">
        <div className="channel-banner">
          <img src={channel.bannerImage} alt="" />
        </div>
        <div className="channel-info">
          <div className="channel-user">
            <img src={channel.channelImage} alt="" height={150} width={150} />
          </div>
          <div className="channel-info-right-section">
            <h2>{channel.name}</h2>
            <div className="channel-info-details">
              <span>
                <strong>@{channel.name}</strong>
              </span>
              <span>{FormatNumbers(channel.subscribers)} subscribers</span>
              <span>{videos.length} videos</span>
            </div>
            <div className="channel-description">{channel.description}</div>
            <div className="channel-info-buttons">
              <button>Subscribe</button>
              <button>Join</button>
            </div>
          </div>
        </div>

        <div>
          <div className="channel-nav">
            <li
              className={activeTab === "Home" ? "active-tab" : ""}
              onClick={() => setActiveTab("Home")}
            >
              Home
            </li>
            <li
              className={activeTab === "videos" ? "active-tab" : ""}
              onClick={() => setActiveTab("videos")}
            >
              videos
            </li>
            <li onClick={() => setActiveTab("shorts")}>shorts</li>
            <li onClick={() => setActiveTab("live")}>live</li>
            <li onClick={() => setActiveTab("playlist")}>playlist</li>
          </div>
          <hr />
        </div>

        {(activeTab === "Home" || activeTab === "videos") && (
          <div className="channel-videos">
            {videos.length > 0 ? (
              videos.map((ele) => (
                <Link
                  key={ele._id}
                  to={`/watch/${ele.videoId}`}
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  <Card videodata={ele} medium={true} />
                </Link>
              ))
            ) : (
              <div className="empty-tab">
                <img src="/video.png" alt="no videos" className="empty-icon" />
                <p>This channel has no videos yet</p>
              </div>
            )}
          </div>
        )}
        {activeTab === "shorts" && (
          <div className="empty-tab">
            <img src="/shorts.png" alt="shorts" className="empty-icon" />
            <p>No shorts available</p>
          </div>
        )}

        {activeTab === "live" && (
          <div className="empty-tab">
            <img src="/stream.png" alt="live" className="empty-icon" />
            <p>No live streams yet</p>
          </div>
        )}

        {activeTab === "playlist" && (
          <div className="empty-tab">
            <img src="/subscribe.png" alt="playlist" className="empty-icon" />
            <p>This channel hasn’t created any playlists</p>
          </div>
        )}
      </div>
    </div>
  );
}
