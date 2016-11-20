import MovieRepository from '../repositories/MovieRepository';

const validateMovie = (movie) => {
  const isValid = movie.title && movie.year && movie.url && movie.director;
  return isValid;
};

export const getMovies = (filter) => {
  if (filter && filter === 'MISSING_TITLE') {
    return MovieRepository.getMoviesWithMissingTitle().then(movies => JSON.stringify(movies));
  } else {
    return MovieRepository.getMovies().then(movies => JSON.stringify(movies));
  }
}


export const getMovie = movieId =>
  MovieRepository.getMovie(movieId).then(movie => JSON.stringify(movie));

export const addMovie = (movieDto) => {
  if (!validateMovie(movieDto)) {
    return Promise.reject('DTO_VALIDATION');
  }

  return MovieRepository.addMovie(movieDto);
};

export const deleteMovie = movieId => MovieRepository.deleteMovie(movieId);

export const editMovie = (movieId, movieDto) => {
  if (!validateMovie(movieDto)) {
    return Promise.reject('DTO_VALIDATION');
  }

  return MovieRepository.updateMovie(movieId, movieDto);
};
