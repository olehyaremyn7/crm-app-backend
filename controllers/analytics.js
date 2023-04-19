const error = require('../utils/errorHandler');
const Order = require('../models/Order');
const { createOverview, createAnalytics } = require('../utils/analytics');
const { subtractDay } = require('../utils/moment');

module.exports.overview = async (req, res) => {
  try {
    const { id } = req.user;
    const orders = await Order.find({ user: id }).sort({ date: 1 });
    const yesterdayDate = subtractDay(1);

    res.status(200).json({
      response: 'success',
      message: orders.length
        ? 'Information for overview generated'
        : 'There are no orders to generate overview information',
      date: yesterdayDate,
      overview: orders.length ? createOverview(orders) : [],
    });
  } catch (e) {
    e.message = 'An error occurred while trying to load information for overview. Try again';
    error(res, e);
  }
};

module.exports.analytics = async (req, res) => {
  try {
    const { id } = req.user;
    const orders = await Order.find({ user: id }).sort({ date: 1 });
    const { average, charts } = createAnalytics(orders);

    res.status(200).json({
      response: 'success',
      message: orders.length ? 'Analytics generated' : 'There are no orders to generate analytics',
      average,
      charts,
    });
  } catch (e) {
    e.message = 'An error occurred while trying to load analytics. Try again';
    error(res, e);
  }
};
