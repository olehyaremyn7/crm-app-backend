const { corsOriginEndpoint } = require('../environments/environment');

const corsConfig = {
  origin: corsOriginEndpoint,
  methods: ['GET', 'POST', 'PATCH', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization', 'responseType'],
};

module.exports = corsConfig;