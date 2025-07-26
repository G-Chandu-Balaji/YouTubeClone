import express from "express";
import mongoose from "mongoose";
import UserRoutes from "./Routes/user.route.js";
import cors from "cors";

mongoose
  .connect(
    "mongodb+srv://balaji5220771:dMoPRcPPQGfrs593@cluster0.wyl2bi0.mongodb.net/"
  )
  .then(() => console.log("Database connected successfully"))
  .catch((err) => console.log(err));

let app = new express();
let port = 5000;
app.use(cors());
app.use(express.json());
UserRoutes(app);

app.listen(port, () => {
  console.log(`Server is running on port ${port}.....`);
});

console.log("hello");
