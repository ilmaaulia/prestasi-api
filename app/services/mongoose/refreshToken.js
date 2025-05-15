const UserRefreshToken = require('../../api/v1/userRefreshToken/model');
const {
  isRefreshTokenValid,
  createJWT,
  createTokenUser,
  createTokenStudent,
} = require('../../utils');
const Students = require('../../api/v1/students/model');
const Admin = require('../../api/v1/admin/model');
const { NotFoundError } = require('../../errors');

const createUserRefreshToken = async (payload) => {
  const result = await UserRefreshToken.create(payload);
  return result;
};

const getUserRefreshToken = async (req) => {
  const { refreshToken } = req.params;

  const result = await UserRefreshToken.findOne({ refreshToken });

  if (!result) throw new NotFoundError('refreshToken tidak valid');

  const payload = isRefreshTokenValid({ token: result.refreshToken });

  let userCheck = await Students.findOne({ email: payload.email });

  if (!userCheck) {
    userCheck = await Admin.findOne({ email: payload.email });
    if (!userCheck) throw new NotFoundError('User tidak ditemukan');
  }

  const createTokenFunction =
		userCheck instanceof Students ? createTokenStudent : createTokenUser;

  const tokenPayload = createTokenFunction(userCheck);

  const token = createJWT({ payload: tokenPayload });

  return token;
};

module.exports = { createUserRefreshToken, getUserRefreshToken };
