import Movie from '../domain/Movie';
const ObjectID = require('mongodb').ObjectID;

const addMovie = movie => new Movie(movie).save();
const deleteMovie = movieId => Movie.remove({ _id: movieId });
const getMovie = movieId => Movie.findById(movieId);
const getMovies = () => Movie.find({});
const getMoviesWithMissingTitle = () => Movie.find({ $or: [
  { "title.de": { $eq: "" } },
  { "title.en": { $eq: "" } },
  { "title.fr": { $eq: "" } }
] });
const updateMovie = (movieId, movie) => Movie.findByIdAndUpdate(movieId, movie, { new: true });
const updateMovies = (movies) => {
  const bulk = Movie.collection.initializeUnorderedBulkOp();
  movies.forEach((m) => {
    const movieToUpdate = Object.assign({}, m);
    delete movieToUpdate.id;
    bulk.find({ _id: new ObjectID(m.id) }).updateOne(movieToUpdate);
  });
  return bulk.execute();
};

const repo = {
  addMovie,
  deleteMovie,
  getMovie,
  getMovies,
  getMoviesWithMissingTitle,
  updateMovie,
  updateMovies,
};

export default repo;
