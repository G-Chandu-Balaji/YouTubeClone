import mongoose from "mongoose";
import userModel from "./Model/user.model.js";
import channelModel from "./Model/channel.model.js";
import VideoModel from "./Model/video.model.js";
import CommentModel from "./Model/comments.model.js";

mongoose
  .connect(
    "mongodb+srv://balaji5220771:dMoPRcPPQGfrs593@cluster0.wyl2bi0.mongodb.net/"
  )
  .then(() => {
    console.log("MongoDB connected");
    seedComments();
  })
  .catch((err) => console.error(err));

async function seedComments() {
  const videos = await VideoModel.findOne({ _id: "688a3cc86b0386178f406a5b" });
  console.log(videos);
  const users = await userModel.find();

  if (videos.length === 0 || users.length === 0) {
    console.log("Please seed videos and users first.");
    return;
  }

  const comments = [
    {
      videoId: videos._id,
      userId: users[0]._id,
      text: "This video is awesome!,Demon slayer is best anime",
    },
    {
      videoId: videos._id,
      userId: users[1]._id,
      text: "Loved the editing! and amazing animations",
    },
    {
      videoId: videos._id,
      userId: users[2]._id,
      text: "Awesome anime series",
    },
    {
      videoId: videos._id,
      userId: users[3]._id,
      text: "fighting secenes are all top notch",
    },
  ];

  try {
    await CommentModel.insertMany(comments);
    console.log("✅ Comments seeded successfully.");
  } catch (err) {
    console.error("❌ Error seeding comments:", err.message);
  } finally {
    mongoose.disconnect();
  }
}
