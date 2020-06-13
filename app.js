const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const mongoSanitize = require('express-mongo-sanitize');
const AppError = require('./utils/appError');

const globalErrorHandler = require('./controller/errorcontroller');
const authrouter = require('./router/authrouter');
const Todorouter = require('./router/todorouter');

const app = express();
app.enable('trust proxy');
app.use(cors());
app.options('*', cors());

app.use(helmet());
const limiter = rateLimit({
  max: 100,
  windowMs: 60 * 60 * 1000,
  message: 'Too many requests from this IP, please try again in an hour!'
});
app.use('/', limiter);


app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: true, limit: '10kb' }));
app.use(mongoSanitize());


app.use('/auth/',authrouter);
app.use('/todo/',Todorouter);

app.all('*', (req, res, next) => {
    next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
  });


app.use(globalErrorHandler);

module.exports = app;