require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
// const { errors } = require('celebrate');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
// const usersRouter = require('./routes/users');
// const cardsRouter = require('./routes/cards');
// const { login, createUser } = require('./controllers/users');
// const { loginValidation, userValidation } = require('./middlewares/validation');
// const { errorHandler } = require('./middlewares/errorHandler');
// const { auth } = require('./middlewares/auth');
// const NotFoundError = require('./errors/NotFoundError');

const { PORT = 3000 } = process.env;
const app = express();

mongoose.connect('mongodb://localhost:27017/bitfilmsdb', {
  useNewUrlParser: true,
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

// app.post('/signin', loginValidation, login);
// app.post('/signup', userValidation, createUser);

// app.use('/', auth, usersRouter);
// app.use('/', auth, cardsRouter);
// app.use('/*', () => {
//   throw new NotFoundError('Страница не найдена');
// });

// app.use(errors());
// app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
