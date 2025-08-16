import mongoose from "mongoose";
const { Schema } = mongoose;
const videoSchema = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String },
    videoUrl: { type: String, required: true },
    thumbnailUrl: { type: String, required: true },
    channelId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "channel",
      required: true,
    },
    uploadedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    views: { type: Number, default: 0 },
    likes: { type: Number, default: 0 },
    dislikes: { type: Number, default: 0 },
    tags: [String],
  },
  { timestamps: true }
);
let VideoModel = mongoose.model("videos", videoSchema);
export default VideoModel;
