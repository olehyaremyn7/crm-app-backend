module.exports = (res, error) => {
  res.status(500).json({
    response: 'error',
    message: error.message ? error.message : error,
  });
};
