const error = require('../utils/errorHandler');
const Category = require('../models/Category');
const Position = require('../models/Position');
const { isCategoryUpdated } = require('../utils/category');
const { categoryMessages }  = require('../constants/messages');
const { responseStatuses } = require('../constants/index');

const { SUCCESS, WARNING } = responseStatuses;

module.exports.getAll = async (req, res) => {
  const { categoriesFound, noCategories, loadCategoriesServerError } = categoryMessages;

  try {
    const { id: user } = req.user;
    const categories = await Category.find({ user });

    res.status(200).json({
      response: SUCCESS,
      message: categories.length ? categoriesFound : noCategories,
      categories,
    });
  } catch (e) {
    e.message = loadCategoriesServerError;
    error(res, e);
  }
};

module.exports.getById = async (req, res) => {
  const { categoryFound, noCategory, getCategoryServerError } = categoryMessages;

  try {
    const { id: _id } = req.params;
    const { id: user } = req.user;
    const category = await Category.findOne({ _id, user });

    res.status(200).json({
      response: SUCCESS,
      category,
      message: category ? categoryFound : noCategory,
    });
  } catch (e) {
    e.message = getCategoryServerError;
    error(res, e);
  }
};

module.exports.create = async (req, res) => {
  const { caterogyNameExist, categoryCreated, createCategoryServerError } = categoryMessages;

  try {
    const { id: user } = req.user;
    const { name } = req.body;
    const isCategoryNameExist = await Category.findOne({ name, user }).lean();

    if (isCategoryNameExist) {
      return res.status(409).json({
        response: WARNING,
        message: caterogyNameExist,
      });
    }

    const imagePath = req.file ? req.file.path : '';
    const category = new Category({
      name,
      user,
      imagePath,
    });

    await category.save();

    res.status(201).json({
      response: SUCCESS,
      message: categoryCreated,
      category,
    });
  } catch (e) {
    e.message = createCategoryServerError;
    error(res, e);
  }
};

module.exports.update = async (req, res) => {
  const { caterogyNameExist, categoryNotUpdated, categoryUpdated, updateCategoryServerError } = categoryMessages;

  try {
    const { id: _id } = req.params;
    const { id: user } = req.user;
    const updatedCategory = {
      ...req.body,
      user,
      _id,
    };

    if (req.file) {
      const { path } = req.file;

      updatedCategory.imagePath = path;
    }

    const existingCategory = await Category.findOne({ _id, user }).select(`name ${req.file ? 'imagePath' : ''} _id user`).lean();

    if (isCategoryUpdated(existingCategory, updatedCategory)) {
      return res.status(409).json({
        response: WARNING,
        message: categoryNotUpdated,
      });
    }

    const { name } = updatedCategory;
    const isCategoryNameExist = await Category.findOne({
      name,
      user,
      _id: { $ne: _id }
    }).lean();

    if (isCategoryNameExist) {
      return res.status(409).json({
        response: WARNING,
        message: caterogyNameExist,
      });
    }

    const category = await Category.findOneAndUpdate({ _id }, { $set: updatedCategory }, { new: true });

    res.status(200).json({
      response: SUCCESS,
      message: categoryUpdated,
      category,
    });
  } catch (e) {
    e.message = updateCategoryServerError;
    error(res, e);
  }
};

module.exports.remove = async (req, res) => {
  const { categoryDeleted, deleteCategoryServerError } = categoryMessages;

  try {
    const { id: _id } = req.params;

    await Category.deleteOne({ _id });
    await Position.deleteMany({ category: _id });

    res.status(200).json({
      response: SUCCESS,
      message: categoryDeleted,
    });
  } catch (e) {
    e.message = deleteCategoryServerError;
    error(res, e);
  }
};
