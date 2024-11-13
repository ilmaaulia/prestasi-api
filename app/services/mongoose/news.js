const News = require('../../api/v1/news/model');
const { NotFoundError } = require('../../errors');

const createNews = async (req) => {
	const { title, content } = req.body;

	const result = await News.create({ title, content });

	return result;
}

const getAllNewses = async () => {
	const result = await News.find();

	return result;
}

const getOneNews = async (req) => {
	const { id } = req.params;

	const result = await News.findOne({ _id: id });

	if (!result) throw new NotFoundError(`Tidak ada berita dengan id ${id}`);

	return result;
}

const updateNews = async (req) => {
	const { id } = req.params;

	const { title, content } = req.body;

	const result = await News.findOneAndUpdate(
		{ _id: id },
		{ title, content },
		{ new: true, runValidators: true }
	);

	if (!result) throw new NotFoundError(`Tidak ada berita dengan id ${id}`);

	return result;
}

const deleteNews = async (req) => {
	const { id } = req.params;

	const result = await News.findOne({ _id: id });

	if (!result) throw new NotFoundError(`Tidak ada berita dengan id ${id}`);

	await result.deleteOne();

	return result;
}

module.exports = {
	createNews,
	getAllNewses,
	getOneNews,
	updateNews,
	deleteNews,
}