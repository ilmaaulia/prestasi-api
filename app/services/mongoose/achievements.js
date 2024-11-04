const Achievements = require('../../api/v1/achievements/model');
const { NotFoundError } = require('../../errors')

const createAchievements = async (req) => {
	const {
		name,
		date,
		activity_group,
		activity_type,
		achievement_type,
		competition_level,
	} = req.body;

	const result = await Achievements.create({
		name,
		date,
		activity_group,
		activity_type,
		achievement_type,
		competition_level,
	});

	return result;
}

const getAllAchievements = async () => {
	const result = await Achievements.find();

	return result;
}

const getOneAchievement = async (req) => {
	const { id } = req.params;

	const result = await Achievements.findOne({ _id: id });

	if (!result) throw new NotFoundError(`Tidak ada kategori dengan id ${id}`);

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
		},
		{ new: true, runValidators: true }
	);

	if (!result) throw new NotFoundError(`Tidak ada kategori dengan id ${id}`);

	return result;
}

const deleteAchievements = async (req) => {
	const { id } = req.params;

	const result = await Achievements.findOne({ _id: id });

	if (!result) throw new NotFoundError(`Tidak ada kategori dengan id ${id}`);

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