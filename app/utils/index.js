const {
  createJWT,
  isTokenValid,
  createRefreshJWT,
  isRefreshTokenValid,
} = require('./jwt');
const { createTokenUser, createTokenStudent } = require('./create-token-user');

module.exports = {
  createJWT,
  isTokenValid,
  createTokenUser,
  createTokenStudent,
  createRefreshJWT,
  isRefreshTokenValid,
};
