const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
  },
  { timestamps: true }
);

categorySchema.pre('deleteOne', async function (next) {
  const category = this;
  await Post.deleteMany({
    category: category.name,
  });
  next();
});

const categoryModel = mongoose.model('Category', categorySchema);

module.exports = categoryModel;
