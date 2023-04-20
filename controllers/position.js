const error = require('../utils/errorHandler');
const Position = require('../models/Position');
const Category = require('../models/Category');
const { isPositionUpdated } = require('../utils/position');
const { positionsMessages }  = require('../constants/messages');
const { responseStatuses } = require('../constants/index');

const { SUCCESS, WARNING } = responseStatuses;

module.exports.getByCategoryId = async (req, res) => {
  const { positionsFound, noPositions, loadPositionsServerError } = positionsMessages;

  try {
    const { categoryId: category } = req.params;
    const { id: user } = req.user;
    const positions = await Position.find({
      category,
      user,
    });

    res.status(200).json({
      response: SUCCESS,
      message: positions.length ? positionsFound : noPositions,
      positions,
    });
  } catch (e) {
    e.message = loadPositionsServerError;
    error(res, e);
  }
};

module.exports.create = async (req, res) => {
  const { positionNameExist, positionCreated, createPositionServerError } = positionsMessages;

  try {
    const { id: user } = req.user;
    const { category: _id, name } = req.body;
    const isPositionNameExist = await Position.findOne({
      category: _id,
      name,
      user,
    }).lean();

    if (isPositionNameExist) {
      return res.status(409).json({
        response: WARNING,
        message: positionNameExist,
      });
    }

    const position = new Position({
      ...req.body,
      user,
    });

    await position.save();

    const category = await Category.findOne({ _id });
    const positions = category.positions++;

    await Category.findOneAndUpdate({ _id }, { $set: {
      ...category,
      positions,
    } }, { new: true });

    res.status(201).json({
      response: SUCCESS,
      message: positionCreated,
      position,
    });
  } catch (e) {
    e.message = createPositionServerError;
    error(res, e);
  }
};

module.exports.update = async (req, res) => {
  const { positionNameExist, positionNotUpdated, positionUpdated, updatePositionServerError } = positionsMessages;

  try {
    const { id: _id } = req.params;
    const updatedPosition = req.body;
    const existingPosition = await Position.findOne({ _id }).select('name cost category _id').lean();

    if (isPositionUpdated(existingPosition, updatedPosition)) {
      return res.status(409).json({
        response: WARNING,
        message: positionNotUpdated,
      });
    }

    const { id: user } = req.user;
    const { name, category } = updatedPosition;
    const isPositionNameExist = await Position.findOne({
      category,
      name,
      user,
      _id: { $ne: _id }
    }).lean();

    if (isPositionNameExist) {
      return res.status(409).json({
        response: WARNING,
        message: positionNameExist,
      });
    }

    const position = await Position.findOneAndUpdate({ _id }, { $set: updatedPosition }, { new: true });

    res.status(200).json({
      response: SUCCESS,
      message: positionUpdated,
      position,
    });
  } catch (e) {
    e.message = updatePositionServerError;
    error(res, e);
  }
};

module.exports.remove = async (req, res) => {
  const { positionDeleted, deletePositionServerError } = positionsMessages;

  try {
    const { id: positionId } = req.params;
    const { category: _id } = await Position.findOne({
      _id: positionId,
    }).lean();

    await Position.deleteOne({ _id: positionId });

    const category = await Category.findOne({ _id });
    const positions = category.positions--;

    await Category.findOneAndUpdate({ _id }, { $set: {
      ...category,
      positions,
    } }, { new: true });

    res.status(200).json({
      response: SUCCESS,
      message: positionDeleted,
    });
  } catch (e) {
    e.message = deletePositionServerError;
    error(res, e);
  }
};
