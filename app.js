require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const { errors } = require('celebrate');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const usersRouter = require('./routes/users');
const moviesRouter = require('./routes/movies');
const { login, createUser } = require('./controllers/users');
const { loginValidation, userValidation } = require('./middlewares/validation');
const { errorHandler } = require('./middlewares/errorHandler');
const { auth } = require('./middlewares/auth');
// const { requestLogger, errorLogger } = require('./middlewares/logger');
// const NotFoundError = require('./errors/NotFoundError');

const { PORT = 3000 } = process.env;
const app = express();

// const allowedCors = [
//   'https://myflicks.nomoredomains.sbs',
//   'http://myflicks.nomoredomains.sbs',
//   'http://localhost:3000',
//   'https://localhost:3000',
// ];

// app.use((req, res, next) => {
//   const { origin } = req.headers;
//   const { method } = req;
//   const DEFAULT_ALLOWED_METHODS = 'GET,HEAD,PUT,PATCH,POST,DELETE';
//   const requestHeaders = req.headers['access-control-request-headers'];
//   if (allowedCors.includes(origin)) {
//     res.header('Access-Control-Allow-Origin', origin);
//     res.header('Access-Control-Allow-Credentials', 'true');
//   }
//   if (method === 'OPTIONS') {
//     res.header('Access-Control-Allow-Methods', DEFAULT_ALLOWED_METHODS);
//     res.header('Access-Control-Allow-Headers', requestHeaders);
//     res.end();
//     return;
//   }
//   next();
// });

mongoose.connect('mongodb://localhost:27017/moviesdb', {
  useNewUrlParser: true,
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

// app.use(requestLogger);

app.post('/signin', loginValidation, login);
app.post('/signup', userValidation, createUser);

app.use('/', auth, usersRouter);
app.use('/', auth, moviesRouter);
// app.use('/*', () => {
//   throw new NotFoundError('Страница не найдена');
// });

app.use(errors());

// app.use(errorLogger);

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
