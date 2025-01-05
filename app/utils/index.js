const { createJWT, isTokenValid } = require('./jwt');
const { createTokenUser, createTokenStudent } = require('./create-token-user');

module.exports = {
  createJWT,
  isTokenValid,
  createTokenUser,
  createTokenStudent,
};
