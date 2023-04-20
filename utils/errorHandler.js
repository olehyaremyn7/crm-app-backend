const { responseStatuses } = require('../constants/index');

module.exports = (res, error) => {
  const { ERROR } = responseStatuses;

  res.status(500).json({
    response: ERROR,
    message: error.message ? error.message : error,
  });
};
