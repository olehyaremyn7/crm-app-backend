const { mongoURI } = require('../environments/environment');
const { mongoDBMessages } = require('../constants/messages');

const mongoose = require('mongoose');

const { mongoURIError, connected } = mongoDBMessages;

module.exports.connectMongoDB = async () => {
  if (!mongoURI) {
    throw new Error(mongoURIError);
  }

  try {
    await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
    });

    console.log(connected);
  } catch (error) {
    throw new Error(`[ERROR] ${error}`);
  }
};
