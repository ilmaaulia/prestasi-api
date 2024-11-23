const Students = require('../../api/v1/students/model');
const { NotFoundError } = require('../../errors');

const createStudents = async (req) => {
	const {
		name,
		student_id,
		study_program,
		email,
		password,
		image,
	} = req.body;

	const result = await Students.create({
		name,
		student_id,
		study_program,
		email,
		password,
		image,
	});

	return result;
}

const getAllStudents = async (req) => {
	const { keyword, study_program } = req.query;

	let condition = {};

	if (keyword) {
		condition = { ...condition, name: { $regex: keyword, $options: 'i' } };
	}

	if (study_program) {
		condition = { ...condition, study_program };
	}

	const result = await Students.find(condition)
		.populate({ path: 'achievements', select: 'name' })
		.populate({ path: 'image', select: 'name' });

	return result;
}

const getOneStudent = async (req) => {
	const { id } = req.params;

	const result = await Students.findOne({ _id: id })
		.populate({ path: 'achievements', select: 'name' })
		.populate({ path: 'image', select: 'name' });

	if (!result) throw new NotFoundError(`Tidak ada mahasiswa dengan id ${id}`);

	return result;
}

const updateStudents = async (req) => {
	const { id } = req.params;

	const {
		name,
		student_id,
		study_program,
		email,
		password,
		image,
	} = req.body;

	const result = await Students.findOneAndUpdate(
		{ _id: id },
		{
			name,
			student_id,
			study_program,
			email,
			password,
			image,
		},
		{ new: true, runValidators: true }
	);

	if (!result) throw new NotFoundError(`Tidak ada mahasiswa dengan id ${id}`);

	return result;
}

const deleteStudents = async (req) => {
	const { id } = req.params;

	const result = await Students.findOne({ _id: id });

	if (!result) throw new NotFoundError(`Tidak ada mahasiswa dengan id ${id}`);

	await result.deleteOne();

	return result;
}

module.exports = {
	getAllStudents,
	createStudents,
	getOneStudent,
	updateStudents,
	deleteStudents,
}