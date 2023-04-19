module.exports.getTotalPrice = (orderPositions) =>
  orderPositions.reduce((total, { cost, quantity }) => total + cost * quantity, 0);
