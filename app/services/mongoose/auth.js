const Users = require('../../api/v1/admin/model');
const { BadRequestError, UnauthorizedError } = require('../../errors');
const { createTokenUser, createJWT} = require('../../utils');

const signin = async (req) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new BadRequestError('Email dan password harus diisi');
  }

  const result = await Users.findOne({ email: email });

  if (!result) {
    throw new UnauthorizedError('Email atau Password salah.');
  }

  const isPasswordCorrect = await result.comparePassword(password);

  if (!isPasswordCorrect) {
    throw new UnauthorizedError('Email atau Password salah.');
  }

  const token = createJWT({ payload: createTokenUser(result) });

  return token;
};

module.exports = { signin };