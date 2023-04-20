const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const environment = require('../environments/environment');
const error = require('../utils/errorHandler');
const { convernJwtExpiredInIntoMs } = require('../utils/authorization');
const { DEFAULT_JWT_EXPIRES_IN_DAY_FORMAT }  = require('../constants/jwt');

module.exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({
        response: 'warning',
        message: 'User not found. Check input data',
      });
    }

    const { password: userPassword, _id: userId, email: userEmail } = user;
    const isMatch = bcrypt.compareSync(password, userPassword);

    if (!isMatch) {
      return res.status(409).json({
        response: 'warning',
        message: 'Wrong password. Try again',
      });
    }
    
    const { jwtExpiresIn: expiresInEnv, jwt: jwtSecret } = environment;
    const jwtExpiresIn = expiresInEnv || DEFAULT_JWT_EXPIRES_IN_DAY_FORMAT;
    const token = jwt.sign({ userId, email: userEmail }, jwtSecret, { expiresIn: jwtExpiresIn });

    res.status(200).json({
      response: 'success',
      message: 'Logged in',
      token: `Bearer ${token}`,
      expiresIn: convernJwtExpiredInIntoMs(jwtExpiresIn),
      user: {
        id: userId,
        email: userEmail,
        username: '',
      },
    });
  } catch (e) {
    e.message = 'An error occurred on the server while trying to log in. Try again';
    error(res, e);
  }
};

module.exports.registration = async (req, res) => {
  try {
    const { email, password } = req.body;
    const candidate = await User.findOne({ email });

    if (candidate) {
      return res.status(409).json({
        response: 'warning',
        message: 'This email is already in use. Enter another email',
      });
    }

    const hashedPassword = bcrypt.hashSync(password, 12);
    const user = new User({ email, password: hashedPassword });

    await user.save();

    res.status(201).json({
      response: 'success',
      message: 'User successfully created',
    });
  } catch (e) {
    e.message = 'An error occurred on the server while trying to sign up. Try again';
    error(res, e);
  }
};
