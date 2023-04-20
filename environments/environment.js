module.exports = {
  mode: process.env.NODE_ENV,
  port: process.env.PORT,
  corsOriginEndpoint: process.env.CORS_ORIGIN_ENDPOINT,
  mongoEndpoint: process.env.MONGO_DB_ENDPOINT,
  jwt: process.env.JWT,
  jwtExpiresIn: process.env.JWT_EXPIRES_IN,
};