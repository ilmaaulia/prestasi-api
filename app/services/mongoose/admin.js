const Admin = require('../../api/v1/admin/model');
const { BadRequestError } = require('../../errors');

const createAdmin = async req => {
  const { name, email, password, confirmPassword } = req.body;

  if (password !== confirmPassword) {
    throw new BadRequestError('Password dan Konfirmasi Password tidak cocok');
  }

  const result = await Admin.create({ name, email, password });

  delete result._doc.password;

  return result;
};

module.exports = {
  createAdmin,
};
