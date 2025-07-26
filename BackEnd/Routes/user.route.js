import Users, {
  createUsers,
  deleteUser,
  LoginUser,
} from "../Controller/users.controller.js";
import VerifyToken from "../middleware/verify.js";

export default function UserRoutes(app) {
  app.get("/api/users", VerifyToken, Users);
  app.post("/api/users", createUsers);
  app.post("/api/login", LoginUser);

  app.delete("/api/users/:id", deleteUser);
}
