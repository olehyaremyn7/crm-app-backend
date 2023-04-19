const { Schema, model } = require('mongoose');

const orderSchema = new Schema({
  date: {
    type: Date,
    default: Date.now,
  },
  order: {
    type: Number,
    required: true,
  },
  list: [
    {
      name: {
        type: String,
      },
      cost: {
        type: Number,
      },
      quantity: {
        type: Number,
      },
    },
  ],
  user: {
    ref: 'User',
    type: Schema.Types.ObjectId,
  },
});

module.exports = model('Order', orderSchema);
