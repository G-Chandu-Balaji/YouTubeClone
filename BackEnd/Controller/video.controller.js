import VideoModel from "../Model/video.model.js";

// Get all videos
export async function getAllVideos(req, res) {
  try {
    const videos = await VideoModel.find()
      .populate("channelId", "name channelImage bannerImage subscribers")
      .populate("uploadedBy", "username")
      .sort({ createdAt: -1 });
    // .populate("ownerId", "username");
    // .sort({ createdAt: -1 });

    res.status(200).json(videos);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch videos" });
  }
}

// Get video by ID
export async function getVideoById(req, res) {
  try {
    const video = await VideoModel.findById(req.params.videoId)
      .populate("channelId", "name channelImage bannerImage subscribers")
      .populate("uploadedBy", "username");
    // .populate("channelId", "name")
    // .populate("uploadedBy", "name");

    if (!video) return res.status(404).json({ error: "Video not found" });

    res.status(200).json(video);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch video" });
  }
}

// 3. Update video (only by uploader)
export async function updateVideo(req, res) {
  try {
    const video = await VideoModel.findById(req.params.videoId);
    if (!video) return res.status(404).json({ error: "Video not found" });

    if (video.uploadedBy.toString() !== req.user.userId)
      return res
        .status(403)
        .json({ error: "Unauthorized to update this video" });

    const updated = await VideoModel.findByIdAndUpdate(
      req.params.videoId,
      req.body,
      { new: true }
    );
    res.status(200).json(updated);
  } catch (err) {
    res.status(500).json({ error: "Failed to update video" });
  }
}

// 4. Delete video (only by uploader)
export async function deleteVideo(req, res) {
  try {
    const video = await VideoModel.findById(req.params.videoId);
    if (!video) return res.status(404).json({ error: "Video not found" });

    if (video.uploadedBy.toString() !== req.user.userId)
      return res
        .status(403)
        .json({ error: "Unauthorized to delete this video" });

    await VideoModel.findByIdAndDelete(req.params.videoId);
    res.status(200).json({ message: "Video deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: "Failed to delete video" });
  }
}

// 5. Like or unlike video
export async function likeVideo(req, res) {
  try {
    const video = await VideoModel.findById(req.params.videoId);
    if (!video) return res.status(404).json({ error: "Video not found" });

    const userId = req.user.userId;

    if (video.likes.includes(userId)) {
      video.likes.pull(userId); // Unlike
    } else {
      video.likes.push(userId); // Like
      video.dislikes.pull(userId); // Remove dislike if exists
    }

    await video.save();
    res.status(200).json({
      message: "Like status updated",
      likes: video.likes.length,
      dislikes: video.dislikes.length,
    });
  } catch (err) {
    res.status(500).json({ error: "Failed to like video" });
  }
}

// 6. Dislike or undislike video
export async function dislikeVideo(req, res) {
  try {
    const video = await VideoModel.findById(req.params.videoId);
    if (!video) return res.status(404).json({ error: "Video not found" });

    const userId = req.user.userId;

    if (video.dislikes.includes(userId)) {
      video.dislikes.pull(userId); // Undislike
    } else {
      video.dislikes.push(userId); // Dislike
      video.likes.pull(userId); // Remove like if exists
    }

    await video.save();
    res.status(200).json({
      message: "Dislike status updated",
      likes: video.likes.length,
      dislikes: video.dislikes.length,
    });
  } catch (err) {
    res.status(500).json({ error: "Failed to dislike video" });
  }
}

// 7. Search videos by query
export async function searchVideos(req, res) {
  try {
    const q = req.query.q;
    if (!q) return res.status(400).json({ error: "Search query missing" });

    const query = q.toLowerCase();

    const videos = await VideoModel.find({
      $or: [
        { title: { $regex: query, $options: "i" } },
        { tags: { $in: [query] } },
      ],
    })
      .populate("channelId", "name channelImage bannerImage subscribers")
      .populate("uploadedBy", "username");

    res.status(200).json(videos);
  } catch (err) {
    res
      .status(500)
      .json({ error: "Failed to search videos ,internal server error" });
  }
}

export const addVideoByUrl = async (req, res) => {
  try {
    const { title, description, videoUrl, thumbnailUrl, tags, channelId } =
      req.body;

    if (!title || !videoUrl || !thumbnailUrl || !channelId) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const video = await VideoModel.create({
      title,
      description,
      videoUrl,
      thumbnailUrl,
      tags: tags?.split(",").map((tag) => tag.trim()),
      channelId,
      uploadedBy: req.user._id,
    });

    return res.status(201).json({ message: "Video added successfully", video });
  } catch (error) {
    console.error("Add video error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const insertManyVideos = async (req, res) => {
  try {
    const videos = req.body;

    if (!Array.isArray(videos) || videos.length === 0) {
      return res
        .status(400)
        .json({ message: "Video data must be a non-empty array." });
    }

    const insertedVideos = await VideoModel.insertMany(videos);

    res.status(201).json({
      message: "Videos inserted successfully",
      data: insertedVideos,
    });
  } catch (error) {
    console.error("Error inserting videos:", error);
    res.status(500).json({
      message: "Failed to insert videos",
      error: error.message,
    });
  }
};
