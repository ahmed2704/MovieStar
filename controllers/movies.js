// Import the Express module and create a router object
const express = require('express');
const router = express.Router();

// Import the Movie model to interact with the movie collection in the database
const Movie = require('../models/movie');


// GET /movies (index functionality/action)
router.get('/', async(req, res) => {
  //fetch all movies from the database
  const movies = await Movie.find({});

  //render the index page with the list of movies
  res.render('movies/index.ejs', { movies })
})

// GET /movies/new -Display the form to create a new movie
router.get('/new', (req, res) => {
  //render the new movie form
  res.render('movies/new.ejs')
})

//GET /applications/:movieId (show functionality/action)
router.get('/:movieId', async (req, res) => {
  try {
    // Find the movie by ID and populate the 'user' and 'reviews.user' fields for detailing information
    const movie = await Movie.findById(req.params.movieId).populate('user').populate('reviews.user')

    // If the mocie is not found, redirect to the movies list
    if (!movie) {
      return res.redirect('/movies');
    }

    // Render the show pafe wit the spacific movie details
    res.render('movies/show.ejs', { movie });
  } catch (err) {
    console.error(err);
    res.redirect('/movies');
  }
});

//GET /applications/:movieId/edit (edit functionality/action)
router.get('/:movieId/edit', async (req,res) => {
  // Find the movie by ID to prepopulate the edit form
  const movie = await Movie.findById(req.params.movieId)
  // Render the edit page with the mocie details
  res.render('movies/edit.ejs', { movie } );
})

// POST /movies (create functionality/action)
router.post('/', async (req, res) => {
  try {
    // Set the user ID of the logged-in user to the new movie
    req.body.user = req.user._id
    // Create a new movie with the data from the request body
    const movie = await Movie.create(req.body);

    //Create a new review for the mocie using the provided rationf and comment
    const review = {
      rating: req.body.reviewsRating,
      user: req.user._id,
      text: req.body.reviewsComment
    }
    // Add the review to the movies's reviews array
    movie.reviews.push(review);
    //Save the updated movie to the database
    await movie.save()
  } catch (err) {
    console.log(err)
  }
  res.redirect('/movies');
})

//DELET /movies/movieId (delete functionality/action)
router.delete('/:movieId', async (req,res) => {
  try {
    // Find movie by ID and delete it from the database
    await Movie.findByIdAndDelete(req.params.movieId);
    //Redirect to the movies list after deletion
    res.redirect('movies');
  } catch (err){
    console.log(err)
    res.redirect('/movies')
  }
})


//PUT /movies/:movieId (update functionality/action)
router.put('/:movieId', async (req, res) => {
  try {
    //Find the movie by ID to update it
    const movie = await Movie.findById(req.params.movieId);
    // Update the movie title with the new value from the request body
    movie.title = req.body.title;

    await movie.save();
    //Redirect to the updated movies's detail page
    res.redirect(`/movies/${movie.id}`);
  } catch (err) {
    console.log(err)
    res.redirect('/movies')
  }
});


// Export the router to use it in other parts of the application
module.exports = router;