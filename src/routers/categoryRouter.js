const express = require('express');
const {
  addCategory,
  fetchCategories,
  deleteCategory,
  editCategory,
} = require('../controllers/categoryController');
const auth = require('../middlewares/auth');

const router = new express.Router();

// Add a category
router.post('/', auth, addCategory);

// Fetch categories
router.get('/', fetchCategories);

// Delete Category
router.delete('/:id', auth, deleteCategory);

// Edit Category
router.patch('/:id', auth, editCategory);

module.exports = router;
