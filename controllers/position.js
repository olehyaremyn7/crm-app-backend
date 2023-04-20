const error = require('../utils/errorHandler');
const Position = require('../models/Position');
const Category = require('../models/Category');

module.exports.getByCategoryId = async (req, res) => {
  try {
    const { categoryId: category } = req.params;
    const { id: user } = req.user;
    const positions = await Position.find({
      category,
      user,
    });

    res.status(200).json({
      response: 'success',
      message: positions.length ? 'Positions found' : 'No positions',
      positions,
    });
  } catch (e) {
    e.message = 'An error occurred while trying to load positions in this category. Try again';
    error(res, e);
  }
};

module.exports.create = async (req, res) => {
  try {
    const { id: user } = req.user;
    const { category: _id, name } = req.body;
    const candidate = await Position.findOne({
      category: _id,
      name,
      user,
    });

    if (candidate) {
      return res.status(409).json({
        response: 'warning',
        message: 'This position is already exist. Enter another position name',
      });
    }

    const position = new Position({
      ...req.body,
      user,
    });

    await position.save();

    const category = await Category.findById(_id);
    const updated = {
      ...category,
      positions: category.positions++,
    };

    await Category.findOneAndUpdate({ _id }, { $set: updated }, { new: true });

    res.status(201).json({
      response: 'success',
      message: 'New position was successfully created',
      position,
    });
  } catch (e) {
    e.message = 'An error occurred while trying to create a position. Try again';
    error(res, e);
  }
};

module.exports.update = async (req, res) => {
  try {
    const { id: user } = req.user;
    const { name, category } = req.body;
    const candidate = await Position.findOne({
      category,
      name,
      user,
    });

    if (candidate) {
      return res.status(409).json({
        response: 'warning',
        message: 'This position is already exist. Enter another position name',
      });
    }

    const { id: _id } = req.params;
    const position = await Position.findOneAndUpdate({ _id }, { $set: req.body }, { new: true });

    res.status(200).json({
      response: 'success',
      message: 'Position was successfully updated',
      position,
    });
  } catch (e) {
    e.message = 'An error occurred while trying to update the position data. Try again';
    error(res, e);
  }
};

module.exports.remove = async (req, res) => {
  try {
    const { id: _id } = req.params;
    const { category: categoryId } = await Position.findOne({
      _id,
    });
    const category = await Category.findById(categoryId);
    const updated = {
      ...category,
      positions: category.positions--,
    };

    await Category.findOneAndUpdate({ _id: categoryId }, { $set: updated }, { new: true });
    await Position.remove({ _id });

    res.status(200).json({
      response: 'success',
      message: 'Position has been deleted',
    });
  } catch (e) {
    e.message = 'An error occurred while trying to delete a position. Try again';
    error(res, e);
  }
};
