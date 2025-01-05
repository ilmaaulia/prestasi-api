const { StatusCodes } = require('http-status-codes');
const { createImage, updateImage } = require('../../../services/mongoose/images');

const create = async (req, res, next) => {
  try {
    const result = await createImage(req);

    res.status(StatusCodes.CREATED).json({ data: result });
  } catch (error) {
    next(error);
  }
};

const update = async (req, res, next) => {
  try {
    const result = await updateImage(req);

    res.status(StatusCodes.OK).json({ data: result });
  } catch (error) {
    next(error);
  }
};

module.exports = { create, update };
