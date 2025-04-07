const { StatusCodes } = require('http-status-codes');
const { signupStudents, activateStudents, signinStudents, getAllStudents,  getOneStudent, updateStudents, deleteStudents } = require('../../../services/mongoose/students');	

const signup = async (req, res, next) => {
  try {
    const result = await signupStudents(req);

    res.status(StatusCodes.CREATED).json({
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

const activeStudent = async (req, res, next) => {
  try {
    const result = await activateStudents(req);

    res.status(StatusCodes.OK).json({
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

const signin = async (req, res, next) => {
  try {
    const result = await signinStudents(req);

    res.status(StatusCodes.OK).json({
      data: { token: result.token, role: result.role },
    });
  } catch (err) {
    next(err);
  }
};

const index = async (req, res, next) => {
  try {
    const result = await getAllStudents(req);

    res.status(StatusCodes.OK).json({
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

const find = async (req, res, next) => {
  try {
    const result = await getOneStudent(req);

    res.status(StatusCodes.OK).json({
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

const update = async (req, res, next) => {
  try {
    const result = await updateStudents(req);

    res.status(StatusCodes.OK).json({
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

const destroy = async (req, res, next) => {
  try {
    const result = await deleteStudents(req);

    res.status(StatusCodes.NO_CONTENT).json({
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  signup,
  activeStudent,
  signin,
  index,
  find,
  update,
  destroy,
};
