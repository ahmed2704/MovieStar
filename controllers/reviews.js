// Import the Express module and create a router object
const express = require('express');
const router = express.Router();

// Import the Movie model to interact with the movie collection in the database
const Movie = require('../models/movie');

 

//POST /movies/:movieId/reviews - Adds a new review to a specific movie
router.post('/movies/:movieId/reviews', async (req, res) => {
  // Find the  movie by ID passed as a url parameter
  const movie = await Movie.findById(req.params.movieId);

  // Create a new review object using the data sent in the request body
  const review = {
    rating: req.body.reviewsRating, // The rating value for the review
    user: req.user._id, // The ID of the currently logged-in user (review author)
    text: req.body.reviewsComment // the text content of the review
  }
  //Push the new review into the 'reviews' array of the found movie
  movie.reviews.push(review);

  //Save the updated movie document to the database
  await movie.save();

  // Redirect the user to the movie's detail page to see the review
  res.redirect(`/movies/${movie._id}`)
})

//DELETE /movies/:movieId/reviews/:reviewId - Deletes a specific review from a movie
router.delete('/movies/:movieId/reviews/:reviewId', async (req, res) => {
  // Find the movie by ID passed as a URL parameter
  const movie = await Movie.findById(req.params.movieId);

  //Find the specific review within the movie's 'reviews' array by its ID and delete it
  movie.reviews.id(req.params.reviewId).deleteOne();
  
  //Save the updated movie document to the database
  await movie.save();

  //Redirect the user back to then movie's detail page to reflect the deletion
  res.redirect(`/movies/${movie._id}`);
})


module.exports = router;//Export the router to use it in other parts of the application