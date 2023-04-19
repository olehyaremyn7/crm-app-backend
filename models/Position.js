const { Schema, model } = require('mongoose');

const positionSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  cost: {
    type: Number,
    required: true,
  },
  category: {
    ref: 'Category',
    type: Schema.Types.ObjectId,
  },
  user: {
    ref: 'User',
    type: Schema.Types.ObjectId,
  },
});

module.exports = model('Position', positionSchema);
