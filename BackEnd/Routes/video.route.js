// import { verify } from "jsonwebtoken";
import {
  addVideoByUrl,
  deleteVideo,
  dislikeVideo,
  getAllVideos,
  getVideoById,
  insertManyVideos,
  likeVideo,
  searchVideos,
  updateVideo,
} from "../Controller/video.controller.js";
import VerifyToken from "../middleware/verify.js";

export default function videoRoutes(app) {
  app.get("/api/video", getAllVideos);
  app.get("/api/video/search", searchVideos);
  app.get("/api/video/:videoId", getVideoById);
  // app.get("/api/videos/search", searchVideos);

  // Protected routes
  app.post("/api/video", VerifyToken, addVideoByUrl);
  app.post("/api/video/dummy", insertManyVideos);

  app.put("/api/video/:videoId", VerifyToken, updateVideo);
  app.delete("/api/video/:videoId", VerifyToken, deleteVideo);
  app.post("/api/video/:videoId/like", VerifyToken, likeVideo);
  app.post("/api/video/:videoId/dislike", VerifyToken, dislikeVideo);
}
