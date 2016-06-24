import getDbInstance from '../dbManager';
import { ObjectID } from 'mongodb';

const fromDbMovie = (dbMovie) => {
  const movie = dbMovie;
  movie.id = dbMovie._id.toString(); // eslint-disable-line no-underscore-dangle
  delete movie._id; // eslint-disable-line no-underscore-dangle

  return movie;
};

function getMoviesByDirector(director, callback) {
  getDbInstance().collection('movies')
    .find({ director })
    .toArray((err, docs) => {
      const movies = docs.map((movie) => fromDbMovie(movie));
      callback(movies);
    });
}

function getAllMovies(callback) {
  getDbInstance().collection('movies')
    .find()
    .toArray((err, docs) => {
      const movies = docs.map((movie) => fromDbMovie(movie));
      callback(movies);
    });
}

export function getMovies(filter, callback) {
  if (filter && filter.director) {
    getMoviesByDirector(filter.director, callback);
  } else {
    getAllMovies(callback);
  }
}

export function getMovie(movieId, callback) {
  getDbInstance().collection('movies')
    .find({ _id: new ObjectID(movieId) })
    .toArray((err, doc) => {
      const movie = fromDbMovie(doc[0]);
      callback(movie);
    });
}

export function addMovie(movieDto, callback) {
  const movie = {
    title: movieDto.title,
    year: movieDto.year,
    url: movieDto.url,
    director: movieDto.director,
  };
  return getDbInstance().collection('movies')
          .insertOne(movie, (err, result) => {
            callback(result.ops[0]);
          });
}

export function deleteMovie(id) {
  getDbInstance().collection('movies')
    .findOneAndDelete({ _id: new ObjectID(id) });
}

export function editMovie(id, obj) {
  getDbInstance().collection('movies')
    .findOneAndUpdate({ _id: new ObjectID(id) }, obj);
}

export default {
  getMovies,
  getMovie,
  addMovie,
  deleteMovie,
  editMovie,
};
