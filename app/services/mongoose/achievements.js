const Achievements = require('../../api/v1/achievements/model');
const { updateStudentWithAchievement } = require('../../services/mongoose/students');
const { NotFoundError } = require('../../errors');

const createAchievements = async (req) => {
	const {
		name,
		date,
		activity_group,
		activity_type,
		achievement_type,
		competition_level,
		student,
		image,
	} = req.body;

	const result = await Achievements.create({
		name,
		date,
		activity_group,
		activity_type,
		achievement_type,
		competition_level,
		student,
		image,
	});

	await updateStudentWithAchievement(student, result._id);

	return result;
}

const getAllAchievements = async () => {
	const result = await Achievements.find()
		.populate({ path: 'student', select: 'name' })
		.populate({ path: 'image', select: 'name' });

	return result;
}

const getOneAchievement = async (req) => {
	const { id } = req.params;

	const result = await Achievements.findOne({ _id: id })
		.populate({ path: 'student', select: 'name' })
		.populate({ path: 'image', select: 'name' });

	if (!result) throw new NotFoundError(`Tidak ada prestasi dengan id ${id}`);

	return result;
}

const updateAchievements = async (req) => {
	const { id } = req.params;

	const {
		name,
		date,
		activity_group,
		activity_type,
		achievement_type,
		competition_level,
		status,
		student,
		image,
	} = req.body;

	const result = await Achievements.findOneAndUpdate(
		{ _id: id },
		{
			name,
			date,
			activity_group,
			activity_type,
			achievement_type,
			competition_level,
			status,
			student,
			image,
		},
		{ new: true, runValidators: true }
	)
		.populate({ path: 'student', select: 'name'})
		.populate({ path: 'image', select: 'name' });

	if (!result) throw new NotFoundError(`Tidak ada prestasi dengan id ${id}`);

	return result;
}

const deleteAchievements = async (req) => {
	const { id } = req.params;

	const result = await Achievements.findOne({ _id: id });

	if (!result) throw new NotFoundError(`Tidak ada prestasi dengan id ${id}`);

	await result.deleteOne();

	return result;
}

module.exports = {
	getAllAchievements,
	createAchievements,
	getOneAchievement,
	updateAchievements,
	deleteAchievements,
}