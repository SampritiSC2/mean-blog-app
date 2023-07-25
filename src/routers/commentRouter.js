const express = require('express');

const {
  addComment,
  allComments,
  markComment,
  deleteComment,
} = require('../controllers/commentController');
const auth = require('../middlewares/auth');

const router = new express.Router();

// Add a category
router.post('/', addComment);

// Fetch all comments
router.get('/', auth, allComments);

// Mark comment approved/unapproved
router.post('/approval', auth, markComment);

// Delete Comment
router.delete('/:id', auth, deleteComment);

module.exports = router;
