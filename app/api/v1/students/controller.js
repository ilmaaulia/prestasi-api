const { StatusCodes } = require('http-status-codes');
const { getAllStudents, createStudents, getOneStudent, updateStudents, deleteStudents } = require('../../../services/mongoose/students');	

const create = async (req, res, next) => {
	try {
		const result = await createStudents(req);

		res.status(StatusCodes.CREATED).json({
			data: result,
		});
	} catch (err) {
		next(err);
	}
}

const index = async (req, res, next) => {
	try {
		const result = await getAllStudents();

		res.status(StatusCodes.OK).json({
			data: result,
		});
	} catch (err) {
		next(err);
	}
}

const find = async (req, res, next) => {
	try {
		const result = await getOneStudent(req);

		res.status(StatusCodes.OK).json({
			data: result,
		});
	} catch (err) {
		next(err);
	}
}

const update = async (req, res, next) => {
	try {
		const result = await updateStudents(req);

		res.status(StatusCodes.OK).json({
			data: result,
		});
	} catch (err) {
		next(err);
	}
}

const destroy = async (req, res, next) => {
	try {
		const result = await deleteStudents(req);

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