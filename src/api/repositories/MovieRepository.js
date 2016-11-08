import Movie from '../domain/Movie';

const addMovie = movie => new Movie(movie).save();
const deleteMovie = movieId => Movie.remove({ _id: movieId });
const getMovie = movieId => Movie.findById(movieId);
const getMovies = () => Movie.find({});
const updateMovie = (movieId, movie) => Movie.where({ _id: movieId }).update(movie);

const repo = {
  addMovie,
  deleteMovie,
  getMovie,
  getMovies,
  updateMovie,
};

export default repo;
