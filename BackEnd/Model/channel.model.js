import mongoose from "mongoose";
const { Schema } = mongoose;

const channelSchema = new Schema(
  {
    name: { type: String, required: true },
    description: { type: String },
    bannerImage: { type: String }, // URL to banner
    channelImage: { type: String },
    ownerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    subscribers: { type: Number },
  },
  { timestamps: true }
);

let channelModel = mongoose.model("channel", channelSchema);
export default channelModel;
