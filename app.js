const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const helmet = require('helmet');
const compression = require('compression');
const xss = require('xss-clean');
const mongoSanitize = require('express-mongo-sanitize');
const morgan = require('morgan');
const passport = require('passport');
const AuthorizationRouter = require('./routes/authorization');
const AnalyticsRouter = require('./routes/analytics');
const OrderRouter = require('./routes/order');
const CategoryRouter = require('./routes/category');
const PositionRouter = require('./routes/position');
const errorHandler = require('./middleware/errors');
const { limiter } = require('./utils/limiter');

const app = express();

app.use(passport.initialize());
require('./middleware/passport')(passport);

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());
app.use(helmet());
app.use(compression());
app.use(xss());
app.use(mongoSanitize());
app.use(limiter);
app.disable('x-powered-by');

app.use('/api/authorization', AuthorizationRouter);
app.use('/api/analytics', AnalyticsRouter);
app.use('/api/order', OrderRouter);
app.use('/api/category', CategoryRouter);
app.use('/api/position', PositionRouter);

app.use(errorHandler);

module.exports = app;
