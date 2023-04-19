const error = require('../utils/errorHandler');
const Order = require('../models/Order');

module.exports.getAll = async (req, res) => {
  const { id } = req.user;
  const { start, end, order, offset, limit } = req.query;
  const query = { user: id };

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

  try {
    const orders = await Order.find(query)
      .sort({ date: -1 })
      .skip(+offset)
      .limit(+limit);

    res.status(200).json({
      response: 'success',
      message: orders.length ? 'Orders found' : 'No orders',
      orders,
    });
  } catch (e) {
    e.message = 'An error occurred while trying to load orders. Try again';
    error(res, e);
  }
};

module.exports.create = async (req, res) => {
  try {
    const { id } = req.user;
    const { list } = req.body;
    const lastOrder = await Order.findOne({ user: id }).sort({
      date: -1,
    });
    const maxOrder = (lastOrder ? lastOrder.order : 0) + 1;

    const order = new Order({
      list: list,
      user: id,
      order: maxOrder,
    });

    await order.save();

    res.status(201).json({
      response: 'success',
      message: 'New order was successfully created',
      order,
    });
  } catch (e) {
    e.message = 'An error occurred while trying to create a new order. Try again';
    error(res, e);
  }
};
