const Achievements = require('./model');

const create = async (req, res, next) => {
	try {
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

		res.status(201).json({
			data: result,
		});
	} catch (err) {
		next(err);
	}
}

const index = async (req, res, next) => {
	try {
		const result = await Achievements.find();

		res.status(200).json({
			data: result,
		});
	} catch (err) {
		next(err);
	}
}

const find = async (req, res, next) => {
	try {
		const { id } = req.params;

		const result = await Achievements.findOne({ _id: id });

		res.status(200).json({
			data: result,
		});
	} catch (err) {
		next(err);
	}
}

const update = async (req, res, next) => {
	try {
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
		)

		res.status(200).json({
			data: result,
		});
	} catch (err) {
		next(err);
	}
}

const destroy = async (req, res, next) => {
	try {
		const { id } = req.params;

		const result = await Achievements.findByIdAndDelete(id);

		res.status(200).json({
			data: result,
		});
	} catch (err) {
		next(err);
	}
}

module.exports = {
	create,
	index,
	find,
	update,
	destroy,
}