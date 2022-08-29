/* eslint-disable object-curly-newline */
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const NotFoundError = require('../errors/NotFoundError');
const RegistrationError = require('../errors/RegistrationError');
const BadRequestError = require('../errors/BadRequestError');

const { NODE_ENV, JWT_SECRET } = process.env;

module.exports.createUser = (req, res, next) => {
  const { email, password, name } = req.body;
  bcrypt.hash(password, 10)
    .then((hash) => User.create({ email, name, password: hash }))
    .then((user) => res.status(201).send({ email: user.email, name: user.name }))
    .catch((err) => {
      if (err.code === 11000) {
        next(new RegistrationError('Пользователь с таким email уже зарегистрированн'));
      } else if (err.name === 'ValidationError') {
        next(new BadRequestError('Переданы некорректные данные'));
      } else {
        next(err);
      }
    });
};

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;
  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, NODE_ENV === 'production' ? JWT_SECRET : 'super-secret-key', { expiresIn: '7d' });
      res.cookie('token', token, {
        maxAge: 3600000 * 24 * 7,
        httpOnly: true,
      }).send({ token });
    })
    .catch(next);
};

module.exports.getCurrentUser = (req, res, next) => {
  User.findById(req.user._id)
    .then((user) => res.send({ email: user.email, name: user.name }))
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequestError('Переданы некорректные данные'));
      } else {
        next(err);
      }
    });
};

module.exports.updateUserInfo = (req, res, next) => {
  const { name, email } = req.body;
  const userId = req.user._id;

  User.findByIdAndUpdate(userId, { name, email }, { new: true, runValidators: true })
    .orFail(new NotFoundError('Пользователь не найден'))
    .then((user) => res.send({ email: user.email, name: user.name }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError('Переданы некорректные данные'));
      } else {
        next(err);
      }
    });
};
