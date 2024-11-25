const { StatusCodes } = require('http-status-codes');
const { getAllAchievements, createAchievements, getOneAchievement, updateAchievements, deleteAchievements } = require('../../../services/mongoose/achievements');	

const create = async (req, res, next) => {
	try {
		const result = await createAchievements(req);

		res.status(StatusCodes.CREATED).json({
			data: result,
		});
	} catch (err) {
		next(err);
	}
}

const index = async (req, res, next) => {
	try {
		const result = await getAllAchievements(req);

		res.status(StatusCodes.OK).json({
			data: result,
		});
	} catch (err) {
		next(err);
	}
}

const find = async (req, res, next) => {
	try {
		const result = await getOneAchievement(req);

		res.status(StatusCodes.OK).json({
			data: result,
		});
	} catch (err) {
		next(err);
	}
}

const update = async (req, res, next) => {
	try {
		const result = await updateAchievements(req);

		res.status(StatusCodes.OK).json({
			data: result,
		});
	} catch (err) {
		next(err);
	}
}

const destroy = async (req, res, next) => {
	try {
		const result = await deleteAchievements(req);

		res.status(StatusCodes.NO_CONTENT).json({
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