const { UnauthenticatedError } = require('../errors');
const { isTokenValid } = require('../utils/jwt');

const authenticateAdmin = async (req, res, next) => {
  try {
    let token;
    const authHeader = req.headers.authorization;

    if (authHeader && authHeader.startsWith('Bearer')) {
      token = authHeader.split(' ')[1];
    }

    if (!token) {
      throw new UnauthenticatedError('Silakan login terlebih dahulu');
    }

    const payload = isTokenValid({ token });

    req.user = {
      email: payload.email,
      name: payload.name,
      id: payload.userId,
    };

    next();
  } catch (error) {
    next(error);
  }
};

const authenticateStudent = async (req, res, next) => {
  try {
    let token;
    const authHeader = req.headers.authorization;

    if (authHeader && authHeader.startsWith('Bearer')) {
      token = authHeader.split(' ')[1];
    }

    if (!token) {
      throw new UnauthenticatedError('Silakan login terlebih dahulu');
    }

    const payload = isTokenValid({ token });

    req.user = {
      email: payload.email,
      firstName: payload.firstName,
      lastName: payload.lastName,
      id: payload.userId,
    };

    next();
  } catch (error) {
    next(error);
  }
};

module.exports = { authenticateAdmin, authenticateStudent };