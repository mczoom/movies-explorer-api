const usersRouter = require('express').Router();
const { updateUserInfo, getCurrentUser } = require('../controllers/users');
const { updateUserValidation } = require('../middlewares/validation');

usersRouter.get('/users/me', getCurrentUser);
usersRouter.patch('/users/me', updateUserValidation, updateUserInfo);

module.exports = usersRouter;
