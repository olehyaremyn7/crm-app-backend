const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const environment = require('../environments/environment');
const error = require('../utils/errorHandler');
const { convernJwtExpiredInIntoMs } = require('../utils/authorization');
const { DEFAULT_JWT_EXPIRES_IN_DAY_FORMAT }  = require('../constants/jwt');
const { authorizationMessages }  = require('../constants/messages');
const { responseStatuses } = require('../constants/index');

const { SUCCESS, WARNING } = responseStatuses;

module.exports.login = async (req, res) => {
  const { loginError, loggedIn, loginServerError } = authorizationMessages;

  try {
    const { email, password } = req.body;
    const existingUser = await User.findOne({ email });

    if (!existingUser) {
      return res.status(404).json({
        response: WARNING,
        message: loginError,
      });
    }

    const { password: userPassword, _id: userId, email: userEmail } = existingUser;
    const isMatch = bcrypt.compareSync(password, userPassword);

    if (!isMatch) {
      return res.status(409).json({
        response: WARNING,
        message: loginError,
      });
    }
    
    const { jwtExpiresIn: expiresInEnv, jwt: jwtSecret } = environment;
    const jwtExpiresIn = expiresInEnv || DEFAULT_JWT_EXPIRES_IN_DAY_FORMAT;
    const token = jwt.sign({ userId, email: userEmail }, jwtSecret, { expiresIn: jwtExpiresIn });

    res.status(200).json({
      response: SUCCESS,
      message: loggedIn,
      token: `Bearer ${token}`,
      expiresIn: convernJwtExpiredInIntoMs(jwtExpiresIn),
      user: {
        id: userId,
        email: userEmail,
        username: '',
      },
    });
  } catch (e) {
    e.message = loginServerError;
    error(res, e);
  }
};

module.exports.registration = async (req, res) => {
  const { emailAlreadyInUse, registered, registrationServerError } = authorizationMessages;

  try {
    const { email, password } = req.body;
    const existingEmail = await User.findOne({ email });

    if (existingEmail) {
      return res.status(409).json({
        response: WARNING,
        message: emailAlreadyInUse,
      });
    }

    const hashedPassword = bcrypt.hashSync(password, 12);
    const user = new User({ email, password: hashedPassword });

    await user.save();

    res.status(201).json({
      response: SUCCESS,
      message: registered,
    });
  } catch (e) {
    e.message = registrationServerError;
    error(res, e);
  }
};
