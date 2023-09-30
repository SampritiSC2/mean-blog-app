const Category = require('../models/category');

const addCategory = async (req, res) => {
  try {
    const data = req.body;
    if (!data.name || data.name.trim().length === 0) {
      return res.status(400).send({
        error: 'Category Name is required',
      });
    }
    const alreadyPresent = await Category.findOne({ name: data.name });
    if (alreadyPresent) {
      return res.status(400).send({
        error: 'Category already present',
      });
    }
    const category = new Category(data);
    await category.save();
    res.status(201).send(category);
  } catch (e) {
    res.status(400).send({
      error: e.message,
    });
  }
};

const fetchCategories = async (req, res) => {
  try {
    const categories = await Category.find();
    res.send(categories);
  } catch (e) {
    res.status(500).send({
      error: e.message,
    });
  }
};

const deleteCategory = async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);
    if (!category) {
      return res.status(404).send({
        error: 'Category Not Found!',
      });
    }
    await Category.deleteOne(req.params.id);
    res.send(category);
  } catch (e) {
    res.status(500).send({
      error: e.message,
    });
  }
};

const editCategory = async (req, res) => {
  try {
    const id = req.params.id;
    const category = await Category.findById(id);
    if (!category) {
      return res.status(404).send({
        error: 'Category Not Found!',
      });
    }
    if (!req.body.name) {
      return res.status(400).send({
        error: 'Category Name is required',
      });
    }
    const inValidUpdate = Object.keys(req.body).find((update) => update !== 'name');
    if (inValidUpdate) {
      return res.status(400).send({
        error: 'Invalid updates provided!',
      });
    }
    category.name = req.body.name;
    await category.save();
    res.send(category);
  } catch (e) {
    res.status(500).send({
      error: e.message,
    });
  }
};

module.exports = {
  addCategory,
  fetchCategories,
  deleteCategory,
  editCategory,
};
