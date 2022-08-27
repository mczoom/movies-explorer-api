const jwt = require('jsonwebtoken');
const AuthoriseError = require('../errors/AuthoriseError');
const JWT_DEVELOP = require('../utils/config');

const { NODE_ENV, JWT_SECRET } = process.env;

module.exports.auth = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    throw new AuthoriseError('Необходима авторизация');
  }

  const token = authorization.replace('Bearer ', '');
  let payload;

  try {
    payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : JWT_DEVELOP);
  } catch (err) {
    throw new AuthoriseError('Необходима авторизация');
  }
  req.user = payload;

  next();
};
