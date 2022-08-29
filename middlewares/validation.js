/* eslint-disable no-useless-escape */
const { celebrate, Joi } = require('celebrate');

const linkRegExp = /(http:\/\/|https:\/\/)(www.)*[a-z0-9\-\.\_\~\:\/\?\#\[\]\@\!\$\&\'\(\)\*\+\,\;\=]+#*/;

module.exports.loginValidation = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
});

module.exports.userValidation = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
    name: Joi.string().required().min(2).max(30),
  }),
});

module.exports.updateUserValidation = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    name: Joi.string().required().min(2).max(30),
  }),
});

module.exports.movieValidation = celebrate({
  body: Joi.object().keys({
    country: Joi.string().required(),
    director: Joi.string().required(),
    duration: Joi.number().required(),
    year: Joi.string().required(),
    description: Joi.string().required(),
    image: Joi.string().required().pattern(linkRegExp),
    trailerLink: Joi.string().required().pattern(linkRegExp),
    nameRU: Joi.string().required(),
    nameEN: Joi.string().required(),
    thumbnail: Joi.string().required().pattern(linkRegExp),
    movieId: Joi.number().integer().required(),
  }),
});

module.exports.movieIdValidation = celebrate({
  params: Joi.object().keys({
    _id: Joi.string().hex().length(24).required(),
  }),
});

// module.exports.cardValidation = celebrate({
//   body: Joi.object().keys({
//     name: Joi.string().required().min(2).max(30),
//     link: Joi.string().required().pattern(linkRegExp),
//   }),
// });

// module.exports.userInfoValidation = celebrate({
//   body: Joi.object().keys({
//     name: Joi.string().required().min(2).max(30),
//     about: Joi.string().required().min(2).max(20),
//   }),
// });

// module.exports.avatarValidation = celebrate({
//   body: Joi.object().keys({
//     avatar: Joi.string().required().pattern(linkRegExp),
//   }),
// });

// module.exports.userIdValidation = celebrate({
//   params: Joi.object().keys({
//     userId: Joi.string().hex().length(24).required(),
//   }),
// });

// module.exports.cardIdValidation = celebrate({
//   params: Joi.object().keys({
//     cardId: Joi.string().hex().length(24).required(),
//   }),
// });
