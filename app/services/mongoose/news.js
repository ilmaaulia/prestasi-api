const News = require('../../api/v1/news/model');
const { NotFoundError } = require('../../errors');

const createNews = async (req) => {
  const { title, content, author, image } = req.body;

  const result = await News.create({ title, content, author, image });

  return result;
};

const getAllNewses = async (req) => {
  const { keyword, sort, limit } = req.query;

  let condition = {};

  if (keyword) {
    condition = { ...condition, title: { $regex: keyword, $options: 'i' } };
  }

  let query = News.find(condition)
    .populate({ path: 'image', select: 'name' });

  if (sort) {
    const sortCriteria = {};
    const [field, order] = sort.split(':');
    sortCriteria[field] = order === 'desc' ? -1 : 1;
    query = query.sort(sortCriteria);
  }
  
  if (limit) {
    const parsedLimit = parseInt(limit, 10);
    if (!isNaN(parsedLimit) && parsedLimit > 0) {
      query = query.limit(parsedLimit);
    }
  }

  const result = await query;

  return result;
};

const getOneNews = async (req) => {
  const { id } = req.params;

  const result = await News.findOne({ _id: id })
    .populate({ path: 'image', select: 'name' });

  if (!result) throw new NotFoundError(`Tidak ada berita dengan id ${id}`);

  return result;
};

const updateNews = async (req) => {
  const { id } = req.params;

  const { title, content } = req.body;

  const result = await News.findOneAndUpdate(
    { _id: id },
    { title, content },
    { new: true, runValidators: true },
  ).populate({ path: 'image', select: 'name' });

  if (!result) throw new NotFoundError(`Tidak ada berita dengan id ${id}`);

  return result;
};

const deleteNews = async (req) => {
  const { id } = req.params;

  const result = await News.findOne({ _id: id })
    .populate({ path: 'image', select: 'name' });

  if (!result) throw new NotFoundError(`Tidak ada berita dengan id ${id}`);

  await result.deleteOne();

  return result;
};

module.exports = {
  createNews,
  getAllNewses,
  getOneNews,
  updateNews,
  deleteNews,
};
