// controllers/adminController.js

import userModel from "../Model/user.model.js";
import VideoModel from "../Model/video.model.js";

import channelModel from "../Model/channel.model.js";

import CommentModel from "../Model/comments.model.js";

export const deleteAllUsers = async (req, res) => {
  try {
    const result = await userModel.deleteMany({});
    res.status(200).json({
      message: "All users deleted",
      deletedCount: result.deletedCount,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to delete users", error: error.message });
  }
};

export const deleteAllVideos = async (req, res) => {
  try {
    const result = await VideoModel.deleteMany({});
    res.status(200).json({
      message: "All videos deleted",
      deletedCount: result.deletedCount,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to delete videos", error: error.message });
  }
};

export const deleteAllChannels = async (req, res) => {
  try {
    const result = await channelModel.deleteMany({});
    res.status(200).json({
      message: "All channels deleted",
      deletedCount: result.deletedCount,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to delete channels", error: error.message });
  }
};

export const deleteAllComments = async (req, res) => {
  try {
    const result = await CommentModel.deleteMany({});
    res.status(200).json({
      message: "All comments deleted",
      deletedCount: result.deletedCount,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to delete comments", error: error.message });
  }
};
