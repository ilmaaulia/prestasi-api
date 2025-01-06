const { UnauthenticatedError } = require('../errors');
const { isTokenValid } = require('../utils/jwt');

const authenticateUser = async (req, res, next) => {
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
      role: payload.role,
    };

    next();
  } catch (error) {
    next(error);
  }
};

const authorizeRoles = (...roles) => {
  return (req, res, next) => {
    if (!req.user || !roles.includes(req.user.role)) {
      throw new UnauthenticatedError('Akses ditolak');
    }
    next();
  };
};

module.exports = { authenticateUser, authorizeRoles };
