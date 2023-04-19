module.exports = {
  mode: process.env.NODE_ENV,
  port: process.env.PORT,
  mongoURI: process.env.MONGO_URI,
  jwt: process.env.JWT,
  jwtExpiresIn: process.env.JWT_EXPIRES_IN,
};