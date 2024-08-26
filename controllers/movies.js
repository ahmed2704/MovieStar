const express = require('express');
const router = express.Router();
const Movie = require('../models/movie');


// GET /movies (index functionality/action)
router.get('/', async(req, res) => {
  const movies = await Movie.find({});
  res.render('movies/index.ejs', { movies })
})

router.get('/new', (req, res) => {
  res.render('movies/new.ejs')
})

//GET /applications/:movieId (show functionality/action)
router.get('/:movieId', async (req, res) => {
  try {
    const movie = await Movie.findById(req.params.movieId).populate(['user', 'reviews'])
    if (!movie) {
      return res.redirect('/movies');
    }
    res.render('movies/show.ejs', { movie });
  } catch (err) {
    console.error(err);
    res.redirect('/movies');
  }
});

//GET /applications/:movieId/edit (edit functionality/action)
router.get('/:movieId/edit', async (req,res) => {
  // const movie = req.user.Movie._id(req.params.movieId);
  const movie = await Movie.findById(req.params.movieId)
  res.render('movies/edit.ejs', { movie } );
})

// POST /movies (create functionality/action)
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
  } catch (err) {
    console.log(err)
  }
  res.redirect('/movies');
})

//DELET /movies/movieId (delete functionality/action)
router.delete('/:movieId', async (req,res) => {
  try {
    await Movie.findByIdAndDelete(req.params.movieId);
    res.redirect('movies');
  } catch (err){
    console.log(err)
    res.redirect('/movies')
  }
})


//PUT /movies/:movieId (update functionality/action)
router.put('/:movieId', async (req, res) => {
  try {
    const movie = await Movie.findById(req.params.movieId);
    movie.title = req.body.title;
    await movie.save();
    res.redirect(`/movies/${movie.id}`);
  } catch (err) {
    console.log(err)
    res.redirect('/movies')
  }
});



module.exports = router;