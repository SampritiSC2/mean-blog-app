const Comment = require('../models/comment');
const Post = require('../models/post');

const addComment = async (req, res) => {
  try {
    const { comment, postId } = req.body;
    if (!comment || !postId) {
      return res.status(400).send({
        error: 'Invalid Comment',
      });
    }
    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).send({
        error: 'Post not found',
      });
    }
    const newComment = new Comment({
      name: comment.name,
      content: comment.content,
      postId,
    });
    await newComment.save();
    res.status(201).send(newComment);
  } catch (e) {
    res.status(500).send({
      error: e.message,
    });
  }
};

const allComments = async (req, res) => {
  try {
    const comments = await Comment.find({});
    res.send(comments);
  } catch (e) {
    res.status(500).send({
      error: e.message,
    });
  }
};

const markComment = async (req, res) => {
  try {
    const { approve, commentId } = req.body;
    if (!commentId) {
      return res.status(400).send({
        error: 'Cannot change comment approval status',
      });
    }

    const comment = await Comment.findById(commentId);
    if (!comment) {
      return res.status(404).send({
        error: 'Comment not found',
      });
    }
    comment.isApproved = !!approve;
    await comment.save();
    res.send(comment);
  } catch (e) {
    res.status(500).send({
      error: e.message,
    });
  }
};

const deleteComment = async (req, res) => {
  try {
    const id = req.params.id;
    const comment = await Comment.findByIdAndDelete(id);

    if (!comment) {
      return res.status(404).send({
        error: 'Comment not found',
      });
    }

    res.send(comment);
  } catch (e) {
    res.status(500).send({
      error: e.message,
    });
  }
};

module.exports = {
  addComment,
  allComments,
  markComment,
  deleteComment,
};
