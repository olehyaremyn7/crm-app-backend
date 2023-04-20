const isEqual = require('lodash.isequal');
const { toJSON } = require('./index');

const isPositionUpdated = (prevPosition, newPosition) => isEqual(toJSON(prevPosition), newPosition);

module.exports = {
  isPositionUpdated,
};