const express = require('express');
const router = express.Router();
const Movie = require('../models/movie');

//All paths start with '/'  

//POST /movies/:movieId/reviews
router.post('/movies/:movieId/reviews', async (req, res) => {
  const movie = await Movie.findById(req.params.movieId);
  const review = {
    rating: req.body.reviewsRating,
    user: req.user._id,
    text: req.body.reviewsComment
  }
  movie.reviews.push(review);
  await movie.save();
  res.redirect(`/movies/${movie._id}`)
})

//DELETE /movies/:movieId/reviews/:reviewId
router.delete('/movies/:movieId/reviews/:reviewId', async (req, res) => {
  const movie = await Movie.findById(req.params.movieId).populate('reviews')
  console.log(movie.reviews)
  const filtReview =  movie.reviews.filter( function (review) {
    if(review._id !==  req.params.reviewId) {
      console.log('Is not equal')
      return review
    } else {
      console.log('is equal')
    }
  })
  console.log(filtReview)
  movie.reviews = filtReview
  await movie.save();
  res.redirect(`/movies/${movie._id}`)
})


module.exports = router;