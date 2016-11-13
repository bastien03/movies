import {
  loadMovies as loadMoviesApi,
} from '../../api/movies';

const getDirectors = (movies) => {
  if (!movies || !Array.isArray(movies) || movies.length === 0) {
    return [];
  }

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

function fetchMovies() {
  return {
    API: {
      types: ['LOAD_MOVIES_REQUEST', 'LOAD_MOVIES_SUCCESS', 'LOAD_MOVIES_ERROR'],
      callAPI: () => loadMoviesApi(),
      responseProcessor: (movies) => {
        const directors = getDirectors(movies);
        return ({ movies, directors });
      },
    },
  };
}

export default fetchMovies;
