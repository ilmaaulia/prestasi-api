const News = require('../../api/v1/news/model');
const { NotFoundError } = require('../../errors');

const createNews = async (req) => {
  const { title, content, author, image } = req.body;

  const result = await News.create({ title, content, author, image });

  return result;
};

const getAllNewses = async (req) => {
  const { keyword, sort, limit, page } = req.query;

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
  
  if (sort) {
    const [field, order] = sort.split(':');
    query = query.sort({ [field]: order === 'desc' ? -1 : 1 });
  }
  
  const parsedLimit = parseInt(limit, 10) || 10;
  const parsedPage = parseInt(page, 10) || 1;
  const skip = (parsedPage - 1) * parsedLimit;
  
  query = query.skip(skip).limit(parsedLimit);
  
  const result = await query;
  const total = await News.countDocuments(condition);
  
  return {
    data: result,
    total,
    page: parsedPage,
    pages: Math.ceil(total / parsedLimit),
  };
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

  const { title, content, author, image } = req.body;

  const result = await News.findOneAndUpdate(
    { _id: id },
    { title, content, author, image },
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
