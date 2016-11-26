import MovieRepository from '../repositories/MovieRepository';

const isStringValid = title => title && title.length > 0;

const validateMovie = (movie) => {
  const hasTitle = movie.title && (
     isStringValid(movie.title.de) || isStringValid(movie.title.en) || isStringValid(movie.title.fr)
  );
  const isValid = hasTitle && movie.year && isStringValid(movie.url)
    && isStringValid(movie.director);
  return isValid;
};

// the default title value will be defined as following:
//   - if only one value is defined, it will be set as default
//   - if multiple values are defined, following priority is set
//      - english
//      - french
//      - german
const defineDefaultTitle = (title) => {
  if (isStringValid(title.de) && !isStringValid(title.en) && !isStringValid(title.fr)) {
    return title.de;
  }
  if (isStringValid(title.en) && !isStringValid(title.de) && !isStringValid(title.fr)) {
    return title.en;
  }
  if (isStringValid(title.fr) && !isStringValid(title.de) && !isStringValid(title.en)) {
    return title.fr;
  }
  if (isStringValid(title.en)) return title.en;
  if (isStringValid(title.fr)) return title.fr;

  return title.de;
};

export const getMovies = (filter) => {
  if (filter && filter === 'MISSING_TITLE') {
    return MovieRepository.getMoviesWithMissingTitle().then(movies => JSON.stringify(movies));
  }
  return MovieRepository.getMovies().then(movies => JSON.stringify(movies));
};

export const getMovie = movieId =>
  MovieRepository.getMovie(movieId).then(movie => JSON.stringify(movie));

export const addMovie = (movieDto) => {
  if (!validateMovie(movieDto)) {
    return Promise.reject('DTO_VALIDATION');
  }

  const witDefaultTitle = Object.assign({}, movieDto, {
    title: Object.assign({}, movieDto.title, {
      default: defineDefaultTitle(movieDto.title),
    }),
  });

  return MovieRepository.addMovie(witDefaultTitle);
};

export const deleteMovie = movieId => MovieRepository.deleteMovie(movieId);

export const editMovie = (movieId, movieDto) => {
  if (!validateMovie(movieDto)) {
    return Promise.reject('DTO_VALIDATION');
  }

  const witDefaultTitle = Object.assign({}, movieDto, {
    title: Object.assign({}, movieDto.title, {
      default: defineDefaultTitle(movieDto.title),
    }),
  });

  return MovieRepository.updateMovie(movieId, witDefaultTitle);
};

export const editMovies = (moviesDto) => {
  const moviesWithDefaultTitleDto = [];
  moviesDto.forEach((dto) => {
    if (!validateMovie(dto)) {
      return;
    }

    const withDefaultTitle = Object.assign({}, dto, {
      title: Object.assign({}, dto.title, {
        default: defineDefaultTitle(dto.title),
      }),
    });
    moviesWithDefaultTitleDto.push(withDefaultTitle);
  });

  return MovieRepository.updateMovies(moviesWithDefaultTitleDto);
};
