import {
  addComment,
  deleteComment,
  editComment,
  fetchComments,
  insertDummyComments,
} from "../Controller/comments.controller.js";
import VerifyToken from "../middleware/verify.js";

export default function CommentsRoutes(app) {
  app.get("/api/comments/:videoId", fetchComments);
  app.post("/api/comments/:videoId", VerifyToken, addComment);

  app.put("/api/comments/:commentId", VerifyToken, editComment);

  app.delete("/api/comments/:commentId", VerifyToken, deleteComment);
  app.post("/api/comment/dummy", insertDummyComments);
}
