const express = require('express');
const {
  addPost,
  fetchAllPosts,
  fetchPost,
  updatePost,
  deletePost,
  fetchPostsByCategory,
  fetchAllFeaturedPosts,
  similar,
} = require('../controllers/postController');
const auth = require('../middlewares/auth');

const router = new express.Router();

// Add a post
router.post('/', auth, addPost);

// Fetch all posts
router.get('/', fetchAllPosts);

// Fetch all featured posts
router.get('/featured', fetchAllFeaturedPosts);

// Fetch posts by category
router.get('/category', fetchPostsByCategory);

// Fetch post by id
router.get('/:id', fetchPost);

// Update post
router.patch('/:id', auth, updatePost);

// Delete post
router.delete('/:id', auth, deletePost);

module.exports = router;
