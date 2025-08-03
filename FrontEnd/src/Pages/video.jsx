import React, { useEffect, useState } from "react";
import VideoPlayer from "../components/VIdeoPlayer";
import "./video.css";
import Card from "../components/Card";
import { Link, useParams } from "react-router";
const data = [
  {
    videoId: "video01",
    title: "Learn React in 30 Minutes",
    thumbnailUrl:
      "https://marketplace.canva.com/EAEqfS4X0Xw/1/0/1600w/canva-most-attractive-youtube-thumbnail-wK95f3XNRaM.jpg",
    channelId: "channel01",
    uploader: "user01",
    views: 15200,
    likes: 1023,
    dislikes: 45,
    uploadDate: "2024-09-20",
    comments: [
      {
        commentId: "comment01",
        userId: "user02",
        text: "Great video! Very helpful.",
        timestamp: "2024-09-21T08:30:00Z",
      },
    ],
  },
  {
    videoId: "video02",
    title: "Learn React in 30 Minutes",
    thumbnailUrl:
      "https://i.pinimg.com/736x/5a/2e/37/5a2e373fb15805b2869e86a7dec7a1a4.jpg",
    description: "A quick tutorial to get started with React.",
    channelId: "channel01",
    uploader: "user01",
    views: 15200,
    likes: 1023,
    dislikes: 45,
    uploadDate: "2024-09-20",
    comments: [
      {
        commentId: "comment01",
        userId: "user02",
        text: "Great video! Very helpful.",
        timestamp: "2024-09-21T08:30:00Z",
      },
    ],
  },
  {
    videoId: "video03",
    title: "Learn React in 30 Minutes",
    thumbnailUrl:
      "https://marketplace.canva.com/EAEqfS4X0Xw/1/0/1600w/canva-most-attractive-youtube-thumbnail-wK95f3XNRaM.jpg",
    channelId: "channel01",
    uploader: "user01",
    views: 15200,
    likes: 1023,
    dislikes: 45,
    uploadDate: "2024-09-20",
    comments: [
      {
        commentId: "comment01",
        userId: "user02",
        text: "Great video! Very helpful.",
        timestamp: "2024-09-21T08:30:00Z",
      },
    ],
  },
  {
    videoId: "video04",
    title: "Learn React in 30 Minutes",
    thumbnailUrl:
      "https://i.pinimg.com/736x/5a/2e/37/5a2e373fb15805b2869e86a7dec7a1a4.jpg",
    description: "A quick tutorial to get started with React.",
    channelId: "channel01",
    uploader: "user01",
    views: 15200,
    likes: 1023,
    dislikes: 45,
    uploadDate: "2024-09-20",
    comments: [
      {
        commentId: "comment01",
        userId: "user02",
        text: "Great video! Very helpful.",
        timestamp: "2024-09-21T08:30:00Z",
      },
    ],
  },
  {
    videoId: "video04",
    title: "Learn React in 30 Minutes",
    thumbnailUrl:
      "https://i.pinimg.com/736x/5a/2e/37/5a2e373fb15805b2869e86a7dec7a1a4.jpg",
    description: "A quick tutorial to get started with React.",
    channelId: "channel01",
    uploader: "user01",
    views: 15200,
    likes: 1023,
    dislikes: 45,
    uploadDate: "2024-09-20",
    comments: [
      {
        commentId: "comment01",
        userId: "user02",
        text: "Great video! Very helpful.",
        timestamp: "2024-09-21T08:30:00Z",
      },
    ],
  },
  {
    videoId: "video04",
    title: "Learn React in 30 Minutes",
    thumbnailUrl:
      "https://i.pinimg.com/736x/5a/2e/37/5a2e373fb15805b2869e86a7dec7a1a4.jpg",
    description: "A quick tutorial to get started with React.",
    channelId: "channel01",
    uploader: "user01",
    views: 15200,
    likes: 1023,
    dislikes: 45,
    uploadDate: "2024-09-20",
    comments: [
      {
        commentId: "comment01",
        userId: "user02",
        text: "Great video! Very helpful.",
        timestamp: "2024-09-21T08:30:00Z",
      },
    ],
  },
  {
    videoId: "video04",
    title: "Learn React in 30 Minutes",
    thumbnailUrl:
      "https://i.pinimg.com/736x/5a/2e/37/5a2e373fb15805b2869e86a7dec7a1a4.jpg",
    description: "A quick tutorial to get started with React.",
    channelId: "channel01",
    uploader: "user01",
    views: 15200,
    likes: 1023,
    dislikes: 45,
    uploadDate: "2024-09-20",
    comments: [
      {
        commentId: "comment01",
        userId: "user02",
        text: "Great video! Very helpful.",
        timestamp: "2024-09-21T08:30:00Z",
      },
    ],
  },
  {
    videoId: "video04",
    title: "Learn React in 30 Minutes",
    thumbnailUrl:
      "https://i.pinimg.com/736x/5a/2e/37/5a2e373fb15805b2869e86a7dec7a1a4.jpg",
    description: "A quick tutorial to get started with React.",
    channelId: "channel01",
    uploader: "user01",
    views: 15200,
    likes: 1023,
    dislikes: 45,
    uploadDate: "2024-09-20",
    comments: [
      {
        commentId: "comment01",
        userId: "user02",
        text: "Great video! Very helpful.",
        timestamp: "2024-09-21T08:30:00Z",
      },
    ],
  },
  {
    videoId: "video04",
    title: "Learn React in 30 Minutes",
    thumbnailUrl:
      "https://i.pinimg.com/736x/5a/2e/37/5a2e373fb15805b2869e86a7dec7a1a4.jpg",
    description: "A quick tutorial to get started with React.",
    channelId: "channel01",
    uploader: "user01",
    views: 15200,
    likes: 1023,
    dislikes: 45,
    uploadDate: "2024-09-20",
    comments: [
      {
        commentId: "comment01",
        userId: "user02",
        text: "Great video! Very helpful.",
        timestamp: "2024-09-21T08:30:00Z",
      },
    ],
  },
];

// export default function Video() {
//   const { id } = useParams(); // 👈 Make sure route is /video/:id
//   const [videoData, setVideoData] = useState(null);
//   let [sidevideos, setSideVideos] = useState([]);

//   useEffect(() => {
//     async function fetchData() {
//       try {
//         const res = await fetch(`http://localhost:5000/api/video/${id}`);
//         const data = await res.json();
//         if (!data) {
//           throw new Error("Video data not found");
//         }
//         setVideoData(data);
//         console.log("Fetched data:", data);
//       } catch (err) {
//         console.error("Error fetching video:", err.message);
//       }
//     }

//     if (id) {
//       fetchData();
//     }
//   }, [id]);

//   if (!videoData) {
//     return <div>Loading...</div>;
//   }

//   useEffect(() => {
//     async function getSideVideosData() {
//       try {
//         let res = await fetch("http://localhost:5000/api/video");
//         let data = await res.json();
//         setSideVideos(data);
//         console.log(data);
//       } catch (err) {
//         console.log("error", err.message);
//       }
//     }
//     getSideVideosData();
//   }, []);
//   return (
//     <div className="videoPage">
//       <div className="videoPage-left-section">
//         <VIdeoPlayer videodata={videoData} />
//       </div>

//       <div className="video-list">
//         {sidevideos.map((ele) => (
//           <Link
//             to={`/watch/:${ele._id}`}
//             style={{ textDecoration: "none", color: "inherit" }}
//           >
//             <Card videodata={ele} smaller={true} />
//           </Link>
//         ))}
//       </div>
//     </div>
//   );
// }

export default function Video() {
  const { id } = useParams();
  const [videoData, setVideoData] = useState(null);
  const [sidevideos, setSideVideos] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch(`http://localhost:5000/api/video/${id}`);
        const data = await res.json();
        if (!data) throw new Error("Video data not found");
        setVideoData(data);
      } catch (err) {
        console.error("Error fetching video:", err.message);
      }
    }

    if (id) {
      fetchData();
    }
  }, [id]);

  useEffect(() => {
    async function getSideVideos() {
      try {
        const res = await fetch("http://localhost:5000/api/video");
        const data = await res.json();
        setSideVideos(data);
      } catch (err) {
        console.log("Error fetching side videos:", err.message);
      }
    }

    getSideVideos();
  }, []);

  if (!videoData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="videoPage">
      <div className="videoPage-left-section">
        <VideoPlayer videodata={videoData} />
      </div>

      <div className="video-list">
        {sidevideos.map((ele) => (
          <Link
            to={`/watch/${ele._id}`}
            key={ele._id}
            style={{ textDecoration: "none", color: "inherit" }}
          >
            <Card videodata={ele} smaller={true} />
          </Link>
        ))}
      </div>
    </div>
  );
}
