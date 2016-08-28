import {
  loadMovies as loadMoviesApi,
} from '../../api/movies';

const getDirectors = (movies) => {
  const obj = movies.reduce((param1, param2) => {
    let reduced = {};
    if (param1.director) {
      reduced[param1.director] = reduced[param1.director] ? reduced[param1.director] + 1 : 1;
    } else {
      reduced = param1;
    }
    reduced[param2.director] = reduced[param2.director] ? reduced[param2.director] + 1 : 1;
    return reduced;
  });
  const directors = [];

  Object.keys(obj).map((key) => {
    directors.push({
      name: key,
      numberMovies: obj[key],
    });
    return key;
  });

  return directors.sort((a, b) => b.numberMovies - a.numberMovies);
};

export const loadMovies = (movies) => ({
  type: 'LOAD_MOVIES',
  data: {
    movies,
    directors: getDirectors(movies),
  },
});

export function fetchMovies() {
  return (dispatch) => {
    loadMoviesApi().then(response => dispatch(loadMovies(response)));
  };
}
