import mongoose from "mongoose";
const { Schema } = mongoose;
//  { userId: "user01", username: "JohnDoe", email: "john@example.com", password:
//  "hashedPassword123", avatar: "https://example.com/avatar/johndoe.png", channels:
//  ["channel01"],

const userSchema = new Schema({
  // userId: String,

  username: String,
  email: String,
  password: String,
  // avatar: String,
  // channels: [String],
});

let userModel = mongoose.model("User", userSchema);
export default userModel;
