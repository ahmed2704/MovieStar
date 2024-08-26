const express = require('express');
const router = express.Router();
const ensureLoggedIn = require('../middleware/ensureLoggedIn');
const User = require('../models/user');
const Movie = require('../models/movie');

// Fake "protected" route that would require
// a logged in user.

// GET /movies (index functionality/action)
router.get('/', ensureLoggedIn, async(req, res) => {
  const movies = await Movie.find({user: req.user._id}).populate('user')
  res.render('movies/index.ejs', { movies })
})

router.get('/new', (req, res) => {
  res.render('movies/new.ejs')
})

//GET /applications/:appId (show functionality/action)
router.get('/:movieId', async (req, res) => {
  try {
    const movie = await Movie.findById(req.params.movieId).populate('user').populate('reviews.user');
    if (!movie) {
      return res.redirect('/movies');
    }
    console.log(movie)
    res.render('movies/show.ejs', { movie });
  } catch (err) {
    console.error(err);
    res.redirect('/movies');
  }
});

//GET /applications/:appId/edit (edit functionality/action)
router.get('/:movieId/edit', async (req,res) => {
  // const movie = req.user.Movie._id(req.params.movieId);
  const movie = await Movie.findById(req.params.movieId)
  res.render('movies/edit.ejs', { movie } );
})

// POST /amovies (create functionality/action)
router.post('/', async (req, res) => {
  try {
    req.body.user = req.user._id
    const movie = await Movie.create(req.body);
    const review = {
      rating: req.body.reviewsRating,
      user: req.user._id,
      text: req.body.reviewsComment
    }
    movie.reviews.push(review);
    await movie.save()
  }catch (err) {
    console.log(err)
  }
  res.redirect('/movies');
})



module.exports = router;