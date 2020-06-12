const express = require('express');

const globalErrorHandler = require('./controller/errorcontroller');
const authrouter = require('./router/authrouter');

const app = express();
app.enable('trust proxy');


app.use('/auth/',authrouter);


app.all('*', (req, res, next) => {
    next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
  });


app.use(globalErrorHandler);

module.exports = app;