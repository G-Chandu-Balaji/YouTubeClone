import channelModel from "../Model/channel.model.js";
import userModel from "../Model/user.model.js";
import VideoModel from "../Model/video.model.js";

// Create Channel
export async function createChannel(req, res) {
  try {
    const { name, description, bannerImage, channelImage } = req.body;
    const ownerId = req.user.userId;

    // Validation
    if (!name || !description) {
      return res
        .status(400)
        .json({ error: "Name and description are required" });
    }
    if (!bannerImage || !channelImage) {
      return res
        .status(400)
        .json({ error: "banner Image and channel Image are required" });
    }
    // Optional: Ensure user doesn’t already have a channel
    const existing = await channelModel.findOne({ name });
    if (existing) {
      return res.status(400).json({ error: "channel name already exists" });
    }

    const newChannel = await channelModel.create({
      name,
      description,
      bannerImage,
      ownerId,
      channelImage,
      subscribers: 0,
    });

    res.status(201).json(newChannel);
  } catch (err) {
    console.error("Error creating channel:", err);

    res.status(500).json({ error: "Server error while creating channel" });
  }
}

// Fetch Channel by ID
export async function getChannelById(req, res) {
  try {
    const { channelId } = req.params;
    const channel = await channelModel.findById(channelId);
    // .populate("ownerId", "name")
    // .populate("subscribers", "name");
    const videos = await VideoModel.find({
      channelId: channelId,
    });

    if (!channel) return res.status(404).json({ error: "Channel not found" });
    // if (!videos) return res.status(404).json({ error: "videos not found" });

    res.json({ channel, videos });
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch channel" });
  }
}

// Delete Channel (only owner)
export async function deleteChannel(req, res) {
  try {
    const channel = await channelModel.findById(req.params.channelId);
    if (!channel) return res.status(404).json({ error: "Channel not found" });

    if (channel.ownerId.toString() !== req.user.userId)
      return res.status(403).json({ error: "Unauthorized" });

    await channelModel.findByIdAndDelete(req.params.channelId);
    res.json({ message: "Channel deleted" });
  } catch (err) {
    res.status(500).json({ error: "Failed to delete channel" });
  }
}

//  Subscribe to a Channel
export async function subscribe(req, res) {
  try {
    const channel = await channelModel.findById(req.params.channelId);
    if (!channel) return res.status(404).json({ error: "Channel not found" });

    const userId = req.user.userId;
    if (!channel.subscribers.includes(userId)) {
      channel.subscribers.push(userId);
      await channel.save();
    }

    res.json({
      message: "Subscribed",
      subscribersCount: channel.subscribers.length,
    });
  } catch (err) {
    res.status(500).json({ error: "Failed to subscribe" });
  }
}

//  Unsubscribe from a Channel
export async function unsubscribe(req, res) {
  try {
    const channel = await channelModel.findById(req.params.channelId);
    if (!channel) return res.status(404).json({ error: "Channel not found" });

    const userId = req.user.userId;
    channel.subscribers = channel.subscribers.filter(
      (id) => id.toString() !== userId
    );
    await channel.save();

    res.json({
      message: "Unsubscribed",
      subscribersCount: channel.subscribers.length,
    });
  } catch (err) {
    res.status(500).json({ error: "Failed to unsubscribe" });
  }
}

export const insertManyChannels = async (req, res) => {
  try {
    const channels = req.body;

    if (!Array.isArray(channels) || channels.length === 0) {
      return res
        .status(400)
        .json({ message: "Channel data must be a non-empty array." });
    }

    const inserted = await channelModel.insertMany(channels);

    // Optional: update each user's channelIds array
    for (const channel of inserted) {
      if (channel.ownerId) {
        await userModel.findByIdAndUpdate(channel.ownerId, {
          $push: { channelIds: channel._id },
        });
      }
    }

    res
      .status(201)
      .json({ message: "Channels inserted successfully", data: inserted });
  } catch (error) {
    console.error("Insert channels error:", error);
    res
      .status(500)
      .json({ message: "Failed to insert channels", error: error.message });
  }
};
