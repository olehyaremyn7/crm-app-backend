const app = require('./app');
const { port, mode } = require('./environments/environment');
const { connectMongoDB } = require('./databases/mongoDB');
const { serverMessages } = require('./constants/messages');

(async () => {
  const { envMode, startedOnPort, apiReady, startError, portError, envModeError } = serverMessages;

  if (!port || !mode) {
    throw new Error(!port ? portError : envModeError);
  }

  try {
    await connectMongoDB();

    app.listen(port, () => {
      console.log(startedOnPort);
      console.log(envMode);
      console.log(apiReady);
    });
  } catch ({ message }) {
    console.log(`${startError} ${message}`);
    process.exit(1);
  }
})();
