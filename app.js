const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const app = express();

const achievementsRouter = require('./app/api/v1/achievements/router');
const imagesRouter = require('./app/api/v1/images/router');
const studentsRouter = require('./app/api/v1/students/router');
const newsesRouter = require('./app/api/v1/news/router');

const v1 = '/api/v1';

const notFoundMiddleware = require('./app/middlewares/not-found');
const errorHandlerMiddleware = require('./app/middlewares/handler-error');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
	res.status(200).json({
		message: 'api is working',
	})
})

app.use(v1, achievementsRouter);
app.use(v1, imagesRouter);
app.use(v1, studentsRouter);
app.use(v1, newsesRouter);

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

module.exports = app;
