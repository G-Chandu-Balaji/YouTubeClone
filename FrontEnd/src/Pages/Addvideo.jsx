import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import "./Addvideo.css";
import toast from "react-hot-toast";
import LoadingSpinner from "../components/LoadingSpinner";

// Simple URL checker
function isValidUrl(str) {
  try {
    new URL(str);
    return true;
  } catch {
    return false;
  }
}
function videoIdExtracter(url) {
  // const videoId = url.trim().split("v=")[1];
  // return videoId;
  try {
    const parsed = new URL(url);
    if (parsed.hostname.includes("youtu.be")) {
      return parsed.pathname.slice(1); // after "/"
    }
    if (parsed.searchParams.get("v")) {
      return parsed.searchParams.get("v"); // watch?v=VIDEOID
    }

    if (parsed.pathname.includes("/embed/")) {
      return parsed.pathname.split("/embed/")[1];
    }
    return null;
  } catch {
    return null;
  }
}

export default function AddVideoPage({ isediting = false }) {
  // const navigate = useNavigate();
  const { channelId, id } = useParams();
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [videoUrl, setVideoUrl] = useState("");
  const [thumbnailUrl, setThumbnailUrl] = useState("");
  const [tagsText, setTagsText] = useState(""); // comma-separated

  const [previewThumbOk, setPreviewThumbOk] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [successMsg, setSuccessMsg] = useState("");
  const [loading, setLoading] = useState(false);
  const tags = tagsText
    .split(",")
    .map((t) => t.trim())
    .filter(Boolean);
  console.log("tags", tags);

  useEffect(() => {
    if (isediting && id) {
      (async () => {
        try {
          setLoading(true);
          const token = localStorage.getItem("token");
          const res = await fetch(`http://localhost:5000/api/video/${id}`, {
            headers: { Authorization: `Bearer ${token}` },
          });
          const data = await res.json();
          if (!res.ok) throw new Error(data.error || "Failed to fetch video");

          setTitle(data.title || "");
          setDescription(data.description || "");
          setVideoUrl(data.videoUrl || "");
          setThumbnailUrl(data.thumbnailUrl || "");
          setTagsText(data.tags?.join(", ") || "");
        } catch (err) {
          setError(err.message);
        } finally {
          setLoading(false);
        }
      })();
    }
  }, [isediting, id]);

  // console.log("videoId", videoId);
  async function handleSubmit(e) {
    e.preventDefault();
    setError(null);
    setSuccessMsg("");

    // Basic validation
    if (!title.trim()) return setError("Title is required");
    if (!description.trim()) return setError("Description is required");
    if (!isValidUrl(videoUrl))
      return setError("Please provide a valid Video URL");
    if (!isValidUrl(thumbnailUrl))
      return setError("Please provide a valid Thumbnail URL");
    const videoId = videoIdExtracter(videoUrl);
    const payload = {
      title: title.trim(),
      description: description.trim(),
      videoUrl: `https://www.youtube.com/embed/${videoId}`,
      thumbnailUrl: `https://img.youtube.com/vi/${videoId}/hq720.jpg`,
      tags: tags,
      channelId,
    };
    console.log("videodata", payload);

    try {
      setSubmitting(true);
      const token = localStorage.getItem("token");
      if (!token) {
        setError("User token not found ,try sigining again");
      } else {
        const res = await fetch(
          isediting
            ? `http://localhost:5000/api/video/${id}`
            : "http://localhost:5000/api/video",
          {
            method: isediting ? "PUT" : "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(payload),
          }
        );

        const data = await res.json();
        if (!res.ok) {
          throw new Error(
            data?.error || data?.message || `Failed with ${res.status}`
          );
        }
        if (data) {
          console.log("video data", data);
        }
        toast.success(
          isediting
            ? "Video updated successfully!"
            : "Video added successfully!"
        );
        setSuccessMsg(
          isediting
            ? "Video updated successfully!"
            : "Video added successfully!"
        );
        if (data.channelId || data.video) {
          navigate(`/channel/${channelId}`);
        }

        // Reset form
        setTitle("");
        setDescription("");
        setVideoUrl("");
        setThumbnailUrl("");
        setTagsText("");
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  }
  if (loading)
    return (
      <div className="page">
        <LoadingSpinner />
      </div>
    );

  return (
    <div className="add-video-page page">
      <div className="add-video-card card">
        <h2 className="heading">
          {isediting ? "Edit Video" : "Add New Video"}
        </h2>

        {error && (
          <div className="error" role="alert">
            {error}
          </div>
        )}
        {successMsg && (
          <div className="sucess" role="status">
            {successMsg}
          </div>
        )}

        <form onSubmit={handleSubmit} className="form">
          <label className="label">
            Title
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g., Learn React in 30 Minutes"
              className="input"
              required
            />
          </label>

          <label className="label">
            Description
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Write a short description..."
              rows={5}
              required
              className="textarea"
            />
          </label>

          <label className="label">
            Video URL
            <input
              type="url"
              value={videoUrl}
              onChange={(e) => {
                const url = e.target.value;
                setVideoUrl(url);
                const videoId = videoIdExtracter(url);
                setThumbnailUrl(
                  `https://img.youtube.com/vi/${videoId}/hq720.jpg`
                );
              }}
              placeholder="Paste the Youtube URl"
              required
              className="input"
            />
          </label>

          <label className="label">
            Thumbnail URL
            <input
              type="url"
              value={thumbnailUrl}
              onChange={(e) => setThumbnailUrl(e.target.value)}
              onBlur={() => setPreviewThumbOk(true)}
              placeholder="https://example.com/thumbnail.jpg"
              required
              className="input"
            />
          </label>

          <label className="label">
            Tags (comma-separated)
            <input
              type="text"
              value={tagsText}
              onChange={(e) => setTagsText(e.target.value)}
              placeholder="react, frontend, tutorial"
              className="input"
            />
          </label>

          {tags.length > 0 && (
            <div className="tagsWrap">
              {tags.map((t) => (
                <span className="tag" key={t}>
                  {t}
                </span>
              ))}
            </div>
          )}

          <button type="submit" className="button" disabled={submitting}>
            {submitting
              ? "Submitting..."
              : isediting
              ? "Update Video"
              : "Add Video"}
          </button>
        </form>
      </div>

      <aside className="add-video-preview preview">
        <h3 style={{ marginBottom: 12 }}>Live Preview</h3>

        <div className="previewCard">
          <div className="thumbWrap">
            {videoUrl ? (
              <iframe
                width="100%"
                height="100%"
                src={`https://www.youtube.com/embed/${videoIdExtracter(
                  videoUrl
                )}`}
                frameBorder="0"
                allowFullScreen
              ></iframe>
            ) : (
              <div className="thumbFallback">No video</div>
            )}
          </div>
          <div className="thumbWrap">
            {thumbnailUrl && previewThumbOk ? (
              <img
                src={thumbnailUrl}
                alt="thumbnail preview"
                className="thumb"
                onError={() => setPreviewThumbOk(false)}
              />
            ) : (
              <div className="thumbFallback">No thumbnail</div>
            )}
          </div>
          <div style={{ padding: 12 }}>
            <h4 style={{ margin: 0 }}>{title || "Video title"}</h4>
            <p style={{ margin: "6px 0", color: "#555" }}>
              {description || "Video description will appear here."}
            </p>
            {tags.length > 0 && (
              <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                {tags.map((t) => (
                  <span key={t} className="tagSmall">
                    #{t}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>
      </aside>
    </div>
  );
}
