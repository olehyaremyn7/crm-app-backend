const error = require('../utils/errorHandler');
const Category = require('../models/Category');
const Position = require('../models/Position');

module.exports.getAll = async (req, res) => {
  try {
    const { id } = req.user;
    const categories = await Category.find({ user: id });

    res.status(200).json({
      response: 'success',
      message: categories.length ? 'Categories found' : 'No categories',
      categories,
    });
  } catch (e) {
    e.message = 'An error occurred while trying to load categories. Try again';
    error(res, e);
  }
};

module.exports.getById = async (req, res) => {
  try {
    const { id } = req.params;
    const category = await Category.findById(id);

    res.status(200).json({
      response: 'success',
      category,
      message: category ? 'Category found' : 'No category',
    });
  } catch (e) {
    e.message = 'An error occurred while trying to get category. Try again';
    error(res, e);
  }
};

module.exports.create = async (req, res) => {
  try {
    const { name } = req.body;
    const { id } = req.user;
    const imagePath = req.file ? req.file.path : '';

    const candidate = await Category.findOne({ name });

    if (candidate) {
      return res.status(409).json({
        response: 'warning',
        message: 'This category is already exist. Enter another category name',
      });
    }

    const category = new Category({
      name,
      user: id,
      imagePath,
    });

    await category.save();

    res.status(201).json({
      response: 'success',
      message: 'New category was successfully created',
      category,
    });
  } catch (e) {
    e.message = 'An error occurred while trying to create a category. Try again';
    error(res, e);
  }
};

module.exports.update = async (req, res) => {
  try {
    const updated = req.body;
    const { id: _id } = req.params;

    if (req.file) {
      const { path } = req.file;

      updated.imagePath = path;
    }

    const category = await Category.findOneAndUpdate({ _id }, { $set: updated }, { new: true });

    res.status(200).json({
      response: 'success',
      message: 'Category was successfully updated',
      category,
    });
  } catch (e) {
    e.message = 'An error occurred while trying to update the category data. Try again';
    error(res, e);
  }
};

module.exports.remove = async (req, res) => {
  try {
    const { id: _id } = req.params;

    await Category.deleteOne({ _id });
    await Position.deleteOne({ category: _id });

    res.status(200).json({
      response: 'success',
      message: 'Category has been deleted',
    });
  } catch (e) {
    e.message = 'An error occurred while trying to delete a category. Try again';
    error(res, e);
  }
};
