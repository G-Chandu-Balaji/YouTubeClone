import {
  deleteAllChannels,
  deleteAllComments,
  deleteAllUsers,
  deleteAllVideos,
} from "../Controller/delete.all.js";
import Users, {
  createUsers,
  deleteUser,
  insertManyUsers,
  LoginUser,
} from "../Controller/users.controller.js";
import VerifyToken from "../middleware/verify.js";

export default function UserRoutes(app) {
  app.get("/api/users", Users);
  app.post("/api/user/signup", createUsers);
  app.post("/api/user/login", LoginUser);
  app.post("/api/users/bulk", insertManyUsers);

  app.delete("/api/user/:id", deleteUser);

  //delete all
  app.delete("/api/users", deleteAllUsers);
  app.delete("/api/channel", deleteAllChannels);
  app.delete("/api/comment", deleteAllComments);
  app.delete("/api/video", deleteAllVideos);
}
