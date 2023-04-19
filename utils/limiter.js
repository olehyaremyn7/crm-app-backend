const rateLimit = require('express-rate-limit');
const MongoStore = require('rate-limit-mongo');
const { mongoURI } = require('../environments/environment');
const { mongoDBMessages } = require('../constants/messages');

const { mongoURIError, requestLimit: message } = mongoDBMessages;

if (!mongoURI) {
  throw new Error(mongoURIError);
}

module.exports.limiter = rateLimit({
  store: new MongoStore({
    uri: mongoURI,
  }),
  windowMs: 15 * 60 * 1000,
  max: 100,
  message,
});
