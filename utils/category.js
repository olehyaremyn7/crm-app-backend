const isEqual = require('lodash.isequal');
const { toJSON } = require('./index');

const isCategoryUpdated = (prevCategory, newCategory) => isEqual(toJSON(prevCategory), newCategory);

module.exports = {
  isCategoryUpdated,
};