import {
  createChannel,
  deleteChannel,
  getChannelById,
  insertManyChannels,
} from "../Controller/channel.controller.js";
import VerifyToken from "../middleware/verify.js";

export default function ChannelRoutes(app) {
  app.get("/api/channel/:channelId", getChannelById);
  app.post("api/channel/create", VerifyToken, createChannel);
  app.post("/api/channels/dummy", insertManyChannels);

  app.delete("api/channel/:channelId", VerifyToken, deleteChannel);
}
