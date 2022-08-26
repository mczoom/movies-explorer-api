const moviesRouter = require('express').Router();
const {
  getMovies, createMovie, deleteMovie,
} = require('../controllers/movies');
const { movieValidation, movieIdValidation } = require('../middlewares/validation');

moviesRouter.get('/movies', getMovies);
moviesRouter.post('/movies', movieValidation, createMovie);
moviesRouter.delete('/movies/:_id', movieIdValidation, deleteMovie);
// moviesRouter.put('/cards/:cardId/likes', cardIdValidation, likeCard);
// moviesRouter.delete('/cards/:cardId/likes', cardIdValidation, dislikeCard);

module.exports = moviesRouter;
