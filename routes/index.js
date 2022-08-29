const { Router } = require('express');
const moviesRouter = require('./movies');
const usersRouter = require('./users');
const { auth } = require('../middlewares/auth');
const { loginValidation, userValidation } = require('../middlewares/validation');
const { login, createUser } = require('../controllers/users');
const NotFoundError = require('../errors/NotFoundError');

const router = Router();

router.post('/signup', userValidation, createUser);
router.post('/signin', loginValidation, login);

router.use('/', auth, moviesRouter);
router.use('/', auth, usersRouter);

router.use('*', () => {
  throw new NotFoundError('Страница не найдена');
});

module.exports = router;
