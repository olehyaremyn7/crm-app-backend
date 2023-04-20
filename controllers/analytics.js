const error = require('../utils/errorHandler');
const Order = require('../models/Order');
const { createOverview, createAnalytics } = require('../utils/analytics');
const { subtractDay } = require('../utils/moment');
const { analyticsMessages }  = require('../constants/messages');
const { responseStatuses } = require('../constants/index');

const { SUCCESS } = responseStatuses;

module.exports.overview = async (req, res) => {
  const { overviewGenerated, noOverviewInfo, overviewServerError } = analyticsMessages;

  try {
    const { id: user } = req.user;
    const orders = await Order.find({ user }).sort({ date: 1 });
    const yesterdayDate = subtractDay(1);

    res.status(200).json({
      response: SUCCESS,
      message: orders.length
        ? overviewGenerated
        : noOverviewInfo,
      date: yesterdayDate,
      overview: orders.length ? createOverview(orders) : [],
    });
  } catch (e) {
    e.message = overviewServerError;
    error(res, e);
  }
};

module.exports.analytics = async (req, res) => {
  const { analiticsGenerated, noOrders, analyticsServerError } = analyticsMessages;

  try {
    const { id: user } = req.user;
    const orders = await Order.find({ user }).sort({ date: 1 });
    const { average, charts } = createAnalytics(orders);

    res.status(200).json({
      response: SUCCESS,
      message: orders.length ? analiticsGenerated : noOrders,
      average,
      charts,
    });
  } catch (e) {
    e.message = analyticsServerError;
    error(res, e);
  }
};
