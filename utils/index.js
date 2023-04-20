const getTotalPrice = (orderPositions) =>
  orderPositions.reduce((total, { cost, quantity }) => total + cost * quantity, 0);

const toJSON = (obj) => JSON.parse(JSON.stringify(obj));

module.exports = {
  getTotalPrice,
  toJSON,
};
