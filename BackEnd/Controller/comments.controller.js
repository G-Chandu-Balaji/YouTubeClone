import CommentModel from "../Model/comments.model.js";

//  Fetch comments for a video
export async function fetchComments(req, res) {
  try {
    const { videoId } = req.params;
    const comments = await CommentModel.find({ videoId })
      .populate("userId", "name")
      .sort({ createdAt: -1 });

    res.json(comments);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch comments" });
  }
}

// Add a comment
export async function addComment(req, res) {
  try {
    const { videoId } = req.params;
    const { text } = req.body;
    const userId = req.user.userId;

    const comment = await CommentModel.create({ videoId, userId, text });
    res.status(201).json(comment);
  } catch (err) {
    res.status(500).json({ error: "Failed to add comment" });
  }
}

//  Edit a comment
export async function editComment(req, res) {
  try {
    const { commentId } = req.params;
    const { text } = req.body;
    const comment = await CommentModel.findById(commentId);

    if (!comment) return res.status(404).json({ error: "Comment not found" });
    if (comment.userId.toString() !== req.user.userId)
      return res.status(403).json({ error: "Unauthorized" });

    comment.text = text;
    await comment.save();
    res.json(comment);
  } catch (err) {
    res.status(500).json({ error: "Failed to edit comment" });
  }
}

// Delete a comment
export async function deleteComment(req, res) {
  try {
    const { commentId } = req.params;
    const comment = await CommentModel.findById(commentId);

    if (!comment) return res.status(404).json({ error: "Comment not found" });
    if (comment.userId.toString() !== req.user.userId)
      return res.status(403).json({ error: "Unauthorized" });

    await CommentModel.findByIdAndDelete(commentId);
    res.json({ message: "Comment deleted" });
  } catch (err) {
    res.status(500).json({ error: "Failed to delete comment" });
  }
}

export const insertDummyComments = async (req, res) => {
  try {
    const dummyComments = req.body;
    const inserted = await CommentModel.insertMany(dummyComments);
    res.status(201).json({
      message: "Dummy comments inserted successfully",
      insertedCount: inserted.length,
    });
  } catch (error) {
    console.error("Error inserting comments:", error);
    res.status(500).json({ error: "Failed to insert dummy comments" });
  }
};
