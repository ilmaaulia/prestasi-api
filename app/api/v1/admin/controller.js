const { StatusCodes } = require('http-status-codes');
const { createAdmin, signin } = require('../../../services/mongoose/admin');

const create = async (req, res, next) => {
  try {
    const result = await createAdmin(req);

    res.status(StatusCodes.CREATED).json({
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

const signinCms = async (req, res, next) => {
  try {
    const result = await signin(req);

    res.status(StatusCodes.CREATED).json({
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  create,
  signinCms,
};
