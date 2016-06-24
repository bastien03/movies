import { getMovies } from '../../api/services/MoviesService.js';

export default class IndexComponentServer {

  static loadData(route, params, request, cb) {
    getMovies(route.path, (movies) => {
      const configuration = {
        movies,
        directors: IndexComponentServer.getDirectors(movies),
        isAuthenticated: request.user,
        baseUrl: '.',
      };
      cb(configuration);
    });
  }

  static getDirectors(movies) {
    const tmpDirectors = [];
    const directors = [];
    for (const idx in movies) {
      const director = movies[idx].director;
      if (tmpDirectors[director]) {
        tmpDirectors[director] = tmpDirectors[director] + 1;
      } else {
        tmpDirectors[director] = 1;
      }
    }

    for (const name in tmpDirectors) {
      if (name === 'undefined') continue;

      directors.push({
        name,
        numberMovies: parseInt(tmpDirectors[name], 10),
      });
    }

    return directors.sort((a, b) => b.numberMovies - a.numberMovies);
  }
}
