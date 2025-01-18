const dotenv = require('dotenv');
dotenv.config();

module.exports = {
  urlDb : process.env.URL_MONGODB_PROD,
  jwtExpiration: '2h',
  jwtSecret: process.env.JWT_SECRET,
  senderEmail: process.env.EMAIL,
  password: process.env.PASSWORD,
};
