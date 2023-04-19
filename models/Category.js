const { Schema, model } = require('mongoose');

const categorySchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  imagePath: {
    type: String,
    default: '',
  },
  positions: {
    type: Number,
    default: 0,
    required: true,
  },
  user: {
    ref: 'User',
    type: Schema.Types.ObjectId,
  },
});

module.exports = model('Category', categorySchema);
