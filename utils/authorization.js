const ms = require('ms');

const cache = new Map();

module.exports.convernJwtExpiredInIntoMs = (jwtExpiresIn) => {
  if (cache.has(jwtExpiresIn)) {
    return cache.get(jwtExpiresIn);
  }

  const expiresInMs = ms(jwtExpiresIn);

  cache.set(jwtExpiresIn, expiresInMs);

  return expiresInMs;
};