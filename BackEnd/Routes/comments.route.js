import {
  addComment,
  deleteComment,
  editComment,
  fetchComments,
  insertDummyComments,
} from "../Controller/comments.controller.js";
import VerifyToken from "../middleware/verify.js";

export default function CommentsRoutes(app) {
  app.get("/api/comments/:id", fetchComments);
  app.post("/api/comments/:id", VerifyToken, addComment);

  app.put("/api/comments/:id", VerifyToken, editComment);

  app.delete("/api/comments/:id", VerifyToken, deleteComment);
  app.post("/api/comment/dummy", insertDummyComments);
}
