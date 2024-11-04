const Images = require('../../api/v1/images/model');
const { NotFoundError } = require('../../errors');

const createImage = async (req) => {
	const result = await Images.create({
		name: req.file
			? `uploads/${req.file.filename}`
			: 'uploads/avatar/default.png',
	});

	return result;
}

const updateImage = async (req) => {
	const { id } = req.params;

	const newImage = {
		name: req.file ? `uploads/${req.file.filename}` : undefined,
	};

	const result = await Images.findOneAndUpdate(
		{ _id: id },
		newImage,
		{ new: true, runValidators: true, omitUndefined: true }
	);

	if (!result) throw new NotFoundError(`Tidak ada gambar dengan id ${id}`);

	return result;
};

module.exports = { createImage, updateImage };