const { StatusCodes } = require('http-status-codes');
// eslint-disable-next-line no-unused-vars
const errorHandlerMiddleware = (err, req, res, next) => {
  const customError = {
    statusCode: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
    msg: err.message || 'Terjadi kesalahan, silakan coba lagi nanti',
  };

  // Error data yang dikirim tidak memenuhi aturan mongoose
  if (err.name === 'ValidationError') {
    customError.msg = Object.values(err.errors)
      .map((item) => item.message)
      .join(', ');
    customError.statusCode = StatusCodes.BAD_REQUEST;
  }

  // Error duplicate primary key dari mongoose
  if (err.code && err.code === 11000) {
    customError.msg = `Nilai duplikat dimasukkan untuk field ${Object.keys(
      err.keyValue
    )}, silakan gunakan nilai lain`;
    customError.statusCode = StatusCodes.BAD_REQUEST;
  }

  // Error CastError untuk field yang salah format dari mongoose
  if (err.name === 'CastError') {
    customError.msg = `Tidak ditemukan item dengan id: ${err.value}`;
    customError.statusCode = StatusCodes.NOT_FOUND;
  }

  return res.status(customError.statusCode).json({ msg: customError.msg });
};

module.exports = errorHandlerMiddleware;
