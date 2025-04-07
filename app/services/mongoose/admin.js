const Admin = require('../../api/v1/admin/model');
const { BadRequestError, UnauthorizedError } = require('../../errors');
const { createTokenUser, createJWT } = require('../../utils');

const createAdmin = async req => {
  const { name, email, password, confirmPassword } = req.body;

  if (password !== confirmPassword) {
    throw new BadRequestError('Password dan Konfirmasi Password tidak cocok');
  }

  const result = await Admin.create({ name, email, password });

  delete result._doc.password;

  return result;
};

const signin = async (req) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new BadRequestError('Email dan password harus diisi');
  }

  const result = await Admin.findOne({ email: email });

  if (!result) {
    throw new UnauthorizedError('Email atau Password salah.');
  }

  const isPasswordCorrect = await result.comparePassword(password);

  if (!isPasswordCorrect) {
    throw new UnauthorizedError('Email atau Password salah.');
  }

  const token = createJWT({ payload: createTokenUser(result) });

  return { token, role: createTokenUser(result).role };
};

module.exports = {
  createAdmin,
  signin,
};
