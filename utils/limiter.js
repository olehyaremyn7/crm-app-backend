const rateLimit = require('express-rate-limit');
const MongoStore = require('rate-limit-mongo');
const { mongoEndpoint } = require('../environments/environment');
const { mongoDBMessages } = require('../constants/messages');

const { mongoEndpointError, requestLimit: message } = mongoDBMessages;

if (!mongoEndpoint) {
  throw new Error(mongoEndpointError);
}

module.exports.limiter = rateLimit({
  store: new MongoStore({
    uri: mongoEndpoint,
  }),
  windowMs: 15 * 60 * 1000,
  max: 100,
  message,
});
