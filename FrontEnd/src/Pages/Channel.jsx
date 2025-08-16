import React, { useEffect, useState } from "react";
import {
  Link,
  Navigate,
  useNavigate,
  useOutletContext,
  useParams,
} from "react-router";
import Sidebar from "../components/Sidebar";
import "./Channel.css";
import Card from "../components/Card";
import FormatNumbers from "../utils/formatnumbers";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";
import LoadingSpinner from "../components/LoadingSpinner";

export default function Channel() {
  const { channelId } = useParams();
  const [channeldata, setChanneldata] = useState(null);
  const { isOpen } = useOutletContext();
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("Home");
  const [error, setError] = useState(null);
  const { currentUser, token } = useSelector((store) => store.user);
  const [showEditOptions, setShowEditOptions] = useState(false);
  const navigate = useNavigate();

  // const [expanded, setExpanded] = useState(false);
  async function fetchChannelVideos() {
    try {
      const res = await fetch(`http://localhost:5000/api/channel/${channelId}`);
      const data = await res.json();
      console.log("channel data", data);
      // if (!res.ok) {
      //   throw new Error(`Server error: ${res.status} ${data}`);
      // }
      if (!data || !data.channel) {
        setError("Channel not found or no data available.");
        return;
      }
      setChanneldata(data);
    } catch (err) {
      setError(err.message || "Error fetching channel data");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchChannelVideos();
  }, [channelId]);

  async function handleDeleteVideo(id) {
    setLoading(true);
    try {
      const res = await fetch(`http://localhost:5000/api/video/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await res.json();
      console.log("after pressing button", data);
      if (!res.ok) {
        toast.error(data.error || "Something went wrong");

        return;
      }
      if (data) {
        toast.success("video Deleted Successfully");
        fetchChannelVideos();
      }

      console.log("after deleting video", data);
    } catch (err) {
      toast.error("Network error. Please try again.");

      console.log("error", err.message);
    } finally {
      setLoading(false);
    }
  }
  async function handleEditVideo(videoId) {
    navigate(`/user/channel/${channelId}/editvideo/${videoId}`);
  }

  if (loading)
    return (
      <div>
        <LoadingSpinner />
      </div>
    );
  if (error) return <div className="error-message">{error}</div>;
  console.log("channeldata", channeldata);
  const { channel, videos } = channeldata;
  console.log(channel);
  let leftsection = isOpen ? "mini-leftsection" : "left-section";

  return (
    <div className="channel-layout">
      <div
        className={` ${
          window.innerWidth > 978 ? leftsection : "mini-leftsection"
        }`}
      >
        <Sidebar isOpen={isOpen} closeSidebar={() => setIsOpen(false)} />
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
          <div className={`${videos.length > 0 ? "channel-videos" : ""}`}>
            {videos.length > 0 ? (
              <>
                {videos.map((ele) => (
                  <div>
                    <Link
                      key={ele._id}
                      to={`/watch/${ele.videoId}`}
                      style={{ textDecoration: "none", color: "inherit" }}
                    >
                      <Card videodata={ele} medium={true} />
                    </Link>
                    {showEditOptions && (
                      <div className="video-actions">
                        <button
                          className="edit-btn"
                          onClick={() => handleEditVideo(ele._id)}
                        >
                          Edit
                        </button>
                        <button
                          className="delete-btn"
                          onClick={() => handleDeleteVideo(ele._id)}
                        >
                          Delete
                        </button>
                      </div>
                    )}
                  </div>
                ))}
                {channel.ownerId.username === currentUser && (
                  <div className="channel-video-options">
                    <div className="upload-video-btn">
                      <Link to={`/user/channel/${channelId}/addvideos`}>
                        <button>Upload Videos</button>
                      </Link>
                    </div>
                    <div className="toggle-edit-btn">
                      <button
                        onClick={() => setShowEditOptions(!showEditOptions)}
                      >
                        {showEditOptions ? "Done" : "Edit"}
                      </button>
                    </div>
                  </div>
                )}
              </>
            ) : (
              <div className="empty-tab">
                <img src="/video.png" alt="no videos" className="empty-icon" />
                <p>This channel has no videos yet</p>
                <button>
                  <Link to={`/user/channel/${channelId}/addvideos`}>
                    Upload Videos
                  </Link>
                </button>
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
