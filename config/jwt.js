const jwtConfig = {
  strategy: 'jwt',
  options: { session: false },
};

module.exports = Object.values(jwtConfig);
