const { StatusCodes } = require('http-status-codes');
const { createNews, getAllNewses, getOneNews, updateNews, deleteNews } = require('../../../services/mongoose/news');

const create = async (req, res, next) => {
  try {
    const result = await createNews(req);

    res.status(StatusCodes.CREATED).json({ data: result });
  } catch (error) {
    next(error);
  }
};

const index = async (req, res, next) => {
  try {
    const result = await getAllNewses(req);

    res.status(StatusCodes.OK).json({ data: result });
  } catch (error) {
    next(error);
  }
};

const find = async (req, res, next) => {
  try {
    const result = await getOneNews(req);

    res.status(StatusCodes.OK).json({
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

const update = async (req, res, next) => {
  try {
    const result = await updateNews(req);

    res.status(StatusCodes.OK).json({
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

const destroy = async (req, res, next) => {
  try {
    const result = await deleteNews(req);

    res.status(StatusCodes.NO_CONTENT).json({
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  create,
  find,
  index,
  update,
  destroy,
};
