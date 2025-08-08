import jwt from "jsonwebtoken";
export default async function VerifyToken(req, res, next) {
  const authHeader = req.headers.authorization;

  if (authHeader && authHeader.startsWith("Bearer ")) {
    const token = authHeader.split(" ")[1];

    jwt.verify(token, "hello", function (err, data) {
      if (err) {
        res.status(404).json({ message: err.message });
      } else {
        console.log("decoded data", data);
        req.user = data;
        next();
      }
    });
  } else {
    return res.status(403).json({ message: "No token provided" });
  }
}
// import jwt from "jsonwebtoken";

// export const authenticate = (req, res, next) => {
//   const token = req.headers.authorization?.split(" ")[1];

//   if (!token) return res.status(401).json({ error: "No token provided" });

//   try {
//     const decoded = jwt.verify(token, "your_jwt_secret");
//     req.user = decoded;
//     next();
//   } catch {
//     res.status(401).json({ error: "Invalid token" });
//   }
// };

// import jwt from "jsonwebtoken";

// // Use a strong secret in production (move to .env)
// const JWT_SECRET = "your_jwt_secret";

// export default function authenticate(req, res, next) {
//   const authHeader = req.headers.authorization;

//   if (!authHeader || !authHeader.startsWith("Bearer ")) {
//     return res.status(403).json({ message: "No token provided" });
//   }

//   const token = authHeader.split(" ")[1];

//   try {
//     const decoded = jwt.verify(token, JWT_SECRET);
//     req.user = decoded; // Attach decoded user info to request
//     next();
//   } catch (err) {
//     return res.status(401).json({ message: "Invalid or expired token" });
//   }
// }
