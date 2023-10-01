const Post = require('../models/post');
const Comment = require('../models/comment');

const addPost = async (req, res) => {
  try {
    const data = req.body;
    if (!data.title) {
      return res.status(400).send({
        error: 'Title is required',
      });
    }
    if (!data.excerpt) {
      return res.status(400).send({
        error: 'Excerpt is required',
      });
    }
    if (!data.category) {
      return res.status(400).send({
        error: 'Category is required',
      });
    }
    if (!data.content) {
      return res.status(400).send({
        error: 'Post Content is required',
      });
    }
    if (!data.permalink) {
      return res.status(400).send({
        error: 'Permalink is required',
      });
    }
    if (!data.image) {
      return res.status(400).send({
        error: 'Image is required',
      });
    }
    const post = new Post(data);
    await post.save();
    res.status(201).send(post);
  } catch (e) {
    res.status(400).send({
      error: e.message,
    });
  }
};

const fetchAllPosts = async (req, res) => {
  try {
    const { sortBy, limit } = req.query;
    let posts = await Post.find({})
      .sort({ createdAt: sortBy === 'desc' ? 1 : -1 })
      .limit(limit);
    res.send(posts);
  } catch (e) {
    res.status(500).send({
      error: e.message,
    });
  }
};

const fetchAllFeaturedPosts = async (req, res) => {
  try {
    const posts = await Post.find({ isFeatured: true }).sort({ createdAt: -1 }).limit(6);
    res.send(posts);
  } catch (e) {
    res.status(500).send({
      error: e.message,
    });
  }
};

const fetchPostsByCategory = async (req, res) => {
  try {
    const { name } = req.query;
    let posts = await Post.find({ category: name || '' });
    res.send(posts);
  } catch (e) {
    res.status(500).send({
      error: e.message,
    });
  }
};

const fetchPost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).send({
        error: 'Post not found!',
      });
    }
    await post.populate({
      path: 'comments',
      match: { isApproved: { $eq: true } },
    });
    const postObject = post.toObject();
    res.send({
      ...postObject,
      comments: post.comments,
    });
  } catch (e) {
    res.status(500).send({
      error: e.message,
    });
  }
};

const updatePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).send({
        error: 'Post not found!',
      });
    }
    const allowedUpdates = [
      'title',
      'category',
      'excerpt',
      'content',
      'permalink',
      'image',
      'isFeatured',
    ];
    const updates = Object.keys(req.body);
    const isUpdateAllowed = updates.every((update) => allowedUpdates.includes(update));
    if (!isUpdateAllowed) {
      return res.status(400).send({
        error: 'Invalid Updates',
      });
    }
    updates.forEach((update) => {
      post[update] = req.body[update];
    });
    await post.save();
    res.send(post);
  } catch (e) {
    res.status(400).send({
      error: e.message,
    });
  }
};

const deletePost = async (req, res) => {
  try {
    const post = await Post.findByIdAndDelete(req.params.id);
    if (!post) {
      return res.status(404).send({
        error: 'Post not found!',
      });
    }
    // Delete Comments of the deleted post
    await Comment.deleteMany({
      postId: post._id,
    });
    res.send(post);
  } catch (e) {
    res.status(500).send({
      error: e.message,
    });
  }
};

module.exports = {
  addPost,
  fetchAllPosts,
  fetchPost,
  updatePost,
  deletePost,
  fetchPostsByCategory,
  fetchAllFeaturedPosts,
};
