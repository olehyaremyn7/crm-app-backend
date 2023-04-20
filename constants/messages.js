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

const authorizationMessages = {
  loginError: 'Incorrect email address or password. Please check input data',
  loggedIn: 'Logged in',
  loginServerError: 'An error occurred on the server while trying to log in. Try again',
  emailAlreadyInUse: 'This email is already in use. Enter another email',
  registered: 'User successfully registered',
  registrationServerError: 'An error occurred on the server while trying to sign up. Try again',
};

const analyticsMessages = {
  overviewGenerated: 'Information for overview generated',
  noOverviewInfo: 'There are no orders to generate overview information',
  overviewServerError: 'An error occurred while trying to load information for overview. Try again',
  analiticsGenerated: 'Analytics generated',
  noOrders: 'There are no orders to generate analytics',
  analyticsServerError: 'An error occurred while trying to load analytics. Try again',
};

const ordersMessages = {
  ordersFound: 'Orders found',
  noOrders: 'No orders',
  loadOrdersServerError: 'An error occurred while trying to load orders. Try again',
  orderCreated: 'New order was successfully created',
  createOrderServerError: 'An error occurred while trying to create a new order. Try again',
};

const categoryMessages = {
  categoriesFound: 'Categories found',
  noCategories: 'No categories',
  loadCategoriesServerError: 'An error occurred while trying to load categories. Try again',
  categoryFound: 'Category found',
  noCategory: 'No category',
  getCategoryServerError: 'An error occurred while trying to get category. Try again',
  caterogyNameExist: 'The category with this name already exist. Enter another category name',
  categoryCreated: 'New category was successfully created',
  createCategoryServerError: 'An error occurred while trying to create a category. Try again',
  categoryNotUpdated: 'The category data was not updated! Enter the new category values',
  categoryUpdated: 'Category was successfully updated',
  updateCategoryServerError: 'An error occurred while trying to update the category data. Try again',
  categoryDeleted: 'Category has been deleted',
  deleteCategoryServerError: 'An error occurred while trying to delete a category. Try again',
};

const positionsMessages = {
  positionsFound: 'Positions found',
  noPositions: 'No positions',
  loadPositionsServerError: 'An error occurred while trying to load positions in this category. Try again',
  positionNameExist: 'The position with this name already exist. Enter another position name',
  positionCreated: 'New position was successfully created',
  createPositionServerError: 'An error occurred while trying to create a position. Try again',
  positionNotUpdated: 'The position data was not updated! Enter the new position values',
  positionUpdated: 'Position was successfully updated',
  updatePositionServerError: 'An error occurred while trying to update the position data. Try again',
  positionDeleted: 'Position has been deleted',
  deletePositionServerError: 'An error occurred while trying to delete a position. Try again',
};

module.exports = {
  mongoDBMessages,
  serverMessages,
  jwtMessages,
  authorizationMessages,
  analyticsMessages,
  ordersMessages,
  categoryMessages,
  positionsMessages,
};