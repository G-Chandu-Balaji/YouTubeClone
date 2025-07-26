import jwt from "jsonwebtoken";
export default async function VerifyToken(req, res, next) {
  const authHeader = req.headers.authorization;
  if (authHeader && authHeader.startsWith("BEARER ")) {
    const token = authHeader.split(" ")[1];
    jwt.verify(token, "hello", function (err, data) {
      if (err) {
        res.status(404).json({ message: err.message });
      } else {
        console.log(data);
        next();
      }
    });
  } else {
    return res.status(403).json({ message: "No token provided" });
  }
}
