import {
  addVideoByUrl,
  deleteVideo,
  dislikeVideo,
  getAllVideos,
  getVideoById,
  insertManyVideos,
  likeVideo,
  searchByTag,
  updateVideo,
} from "../Controller/video.controller.js";
import VerifyToken from "../middleware/verify.js";

export default function videoRoutes(app) {
  app.get("/api/video", getAllVideos);
  app.get("/api/video/search", searchByTag);
  app.get("/api/video/:videoId", getVideoById);

  // Protected routes
  app.post("/api/video", addVideoByUrl);
  app.post("/api/video/dummy", insertManyVideos);

  app.put("/api/video/:videoId", VerifyToken, updateVideo);
  app.delete("/api/video/:videoId", VerifyToken, deleteVideo);
  app.post("/api/video/:videoId/like", VerifyToken, likeVideo);
  app.post("/api/video/:videoId/dislike", VerifyToken, dislikeVideo);
}
