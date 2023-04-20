const error = require('../utils/errorHandler');
const Order = require('../models/Order');
const { ordersMessages }  = require('../constants/messages');
const { responseStatuses } = require('../constants/index');

const { SUCCESS } = responseStatuses;

module.exports.getAll = async (req, res) => {
  const { id: user } = req.user;
  const { start, end, order, offset, limit } = req.query;
  const query = { user };

  if (start) {
    query.date = {
      $gte: start,
    };
  }

  if (end) {
    if (!query.date) {
      query.date = {};
    }

    query.date['$lte'] = end;
  }

  if (order) {
    query.order = +order;
  }

  const { ordersFound, noOrders, loadOrdersServerError } = ordersMessages;

  try {
    const orders = await Order.find(query)
      .sort({ date: -1 })
      .skip(+offset)
      .limit(+limit);

    res.status(200).json({
      response: SUCCESS,
      message: orders.length ? ordersFound : noOrders,
      orders,
    });
  } catch (e) {
    e.message = loadOrdersServerError;
    error(res, e);
  }
};

module.exports.create = async (req, res) => {
  const { orderCreated, createOrderServerError } = ordersMessages;

  try {
    const { id: user } = req.user;
    const { list } = req.body;
    const lastOrder = await Order.findOne({ user }).sort({
      date: -1,
    });
    const maxOrder = (lastOrder ? lastOrder.order : 0) + 1;

    const order = new Order({
      list,
      user,
      order: maxOrder,
    });

    await order.save();

    res.status(201).json({
      response: SUCCESS,
      message: orderCreated,
      order,
    });
  } catch (e) {
    e.message = createOrderServerError;
    error(res, e);
  }
};
