const { StatusCodes } = require('http-status-codes');
const { createImage, updateImage, getOneImage } = require('../../../services/mongoose/images');
const path = require('path');

const create = async (req, res, next) => {
  try {
    const result = await createImage(req);

    res.status(StatusCodes.CREATED).json({ data: result });
  } catch (error) {
    next(error);
  }
};

const find = async (req, res, next) => {
  try {
    const result = await getOneImage(req.params.id);
    
    res.sendFile(path.resolve(__dirname, '../../../../public', result.name));
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

module.exports = { create, update, find };
