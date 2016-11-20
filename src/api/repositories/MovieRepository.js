import Movie from '../domain/Movie';

const addMovie = movie => new Movie(movie).save();
const deleteMovie = movieId => Movie.remove({ _id: movieId });
const getMovie = movieId => Movie.findById(movieId);
const getMovies = () => Movie.find({});
const getMoviesWithMissingTitle = () => Movie.find({$or: [
  {"title.de": {$eq: ""}},
  {"title.en": {$eq: ""}},
  {"title.fr": {$eq: ""}}
  ]});
const updateMovie = (movieId, movie) => Movie.findByIdAndUpdate(movieId, movie, { new: true });

const repo = {
  addMovie,
  deleteMovie,
  getMovie,
  getMovies,
  getMoviesWithMissingTitle,
  updateMovie,
};

export default repo;
