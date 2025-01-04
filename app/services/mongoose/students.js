const Students = require('../../api/v1/students/model');
const { NotFoundError, BadRequestError } = require('../../errors');
const { otpMail } = require('../../services/email');

const signupStudents = async (req) => {
	const {
		firstName,
		lastName,
		student_id,
		study_program,
		email,
		password,
		image,
	} = req.body;

	let result = await Students.findOne({
		email,
		status: 'Aktif',
	});

	if (result) throw new BadRequestError('Mahasiswa sudah terdaftar');

	result = await Students.findOne({
		email,
		status: 'Tidak Aktif',
	});

	if (result) {
		result.firstName = firstName;
		result.lastName = lastName;
		result.student_id = student_id;
		result.study_program = study_program;
		result.email = email;
		result.password = password;
		result.image = image;
		result.otp = Math.floor(Math.random() * 9999)
		await result.save();
	} else {
		result = await Students.create({
			firstName,
			lastName,
			student_id,
			study_program,
			email,
			password,
			image,
			otp: Math.floor(Math.random() * 9999)
		})
	}
	await otpMail(email, result);

	return result;
}

const activateStudents = async (req) => {
	const { email, otp } = req.body;
	const check = await Students.findOne({
		email,
	});

	if (!check) throw new NotFoundError('Mahasiswa belum terdaftar');

	if (check && check.otp !== otp) throw new BadRequestError('OTP tidak sesuai');

	const result = await Students.findByIdAndUpdate(
		check._id,
		{
			status: 'Aktif',
		},
		{ new: true }
	);

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
		firstName,
		lastName,
		student_id,
		study_program,
		email,
		password,
		image,
	} = req.body;

	const result = await Students.findOneAndUpdate(
		{ _id: id },
		{
			firstName,
			lastName,
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
	signupStudents,
	activateStudents,
	getAllStudents,
	getOneStudent,
	updateStudents,
	deleteStudents,
}