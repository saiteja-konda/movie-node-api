const express = require("express");
const router = express.Router();
const Movie = require("../models/movie");

// Getting all
router.get("/", async (req, res) => {
  try {
    const movies = await Movie.find();
    res.json(movies);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Getting One
router.get("/:id", getMovie, (req, res) => {
  res.json(res.movie);
});

// Creating one
router.post("/", async (req, res) => {
  const movie = new Movie({
    name: req.body.name,
    image: req.body.image,
    info: req.body.info,
  });
  try {
    const newMovie = await movie.save();
    res.status(201).json(newMovie);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Updating One
router.patch('/:id', getMovie, async (req, res) => {
  if (req.body.name != null) {
    res.movie.name = req.body.name
  }
  if (req.body.image != null) {
    res.movie.image = req.body.image
  }
  if (req.body.info != null) {
    res.movie.info = req.body.info
  }
  try {
    const updateMovie = await res.movie.save()
    res.json(updateMovie)
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
})

// Deleting One
router.delete('/:id', getMovie, async (req, res) => {
  try {
    await res.movie.remove()
    res.json({ message: 'movie deleted' })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})


async function getMovie(req, res, next) {
  let movie;
  try {
    movie = await Movie.findById(req.params.id);
    if (movie == null) {
      return res.status(404).json({ message: "Cannot find movie" });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }

  res.movie = movie;
  next();
}

module.exports = router;
