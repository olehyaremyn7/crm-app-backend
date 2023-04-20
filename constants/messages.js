const { mode, port } = require('../environments/environment');

const mongoDBMessages = {
  mongoEndpointError: '[ERROR] MongoDB connection URI not available! Unable to connect to MongoDB database and start server. Pass the correct URI to process...',
  requestLimit: '[WARNING] Too many requests addressed to MongoDB',
  connected: '[SUCCESS] MongoDB database has been successfully connected. Expecting server to start...',
};

const serverMessages = {
  envMode: `[SUCCESS] The server is running in ${mode.toUpperCase()} mode!`,
  envModeError: `[ERROR] Environment mode not defined! Unable to start server. Go into NODE_ENV="production" or NODE_ENV="development" mode to process...`,
  startedOnPort: `[SUCCESS] The server is started on the port ${port}...`,
  portError: `[ERROR] The server port is not defined! Unable to start server. Pass the PORT number to process...`,
  apiReady: '[SUCCESS] The PowerCRM API is ready to go! Waiting for external requests...',
  startError: '[ERROR] An error occurred while starting the server. Error message:'
};

const jwtMessages = {
  jwtSecretError: `[ERROR] JWT secret or key not defined! Failed to start server. Pass a JWT env variable to process...`,
};

module.exports = {
  mongoDBMessages,
  serverMessages,
  jwtMessages,
};