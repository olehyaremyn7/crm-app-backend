const { mongoEndpoint } = require('../environments/environment');
const { mongoDBMessages } = require('../constants/messages');

const mongoose = require('mongoose');

const { mongoEndpointError, connected } = mongoDBMessages;

module.exports.connectMongoDB = async () => {
  if (!mongoEndpoint) {
    throw new Error(mongoEndpointError);
  }

  try {
    await mongoose.connect(mongoEndpoint, {
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
