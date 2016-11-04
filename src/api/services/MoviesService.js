import dbInstance from '../dbManager';
import { ObjectID } from 'mongodb';
import co from 'co';

const fromDbMovie = (dbMovie) => {
  const movie = Object.assign({}, dbMovie, {
    id: dbMovie._id.toString(), // eslint-disable-line no-underscore-dangle
  });
  delete movie._id; // eslint-disable-line no-underscore-dangle
  return movie;
};

export const getAllMovies = () => dbInstance().then(db => co(function* gen() {
  // console.log('getAllMovies', db.collection('movies').find());
  // Retrieve all movies
  const res = yield db.collection('movies').find().toArray();
  const movies = [];
  res.map(movie => movies.push(fromDbMovie(movie)));
  db.close(); // Close connection
  return movies;
}));

export const getMovie = (movieId) => dbInstance().then(db => co(function* gen() {
  // Retrieve one movie
  const res = yield db.collection('movies').find({ _id: new ObjectID(movieId) }).toArray();
  const movie = fromDbMovie(res[0]);
  db.close(); // Close connection
  return movie;
}));

export const addMovie = (movieDto) => dbInstance().then(db => co(function* gen() {
  const movie = Object.assign({}, movieDto);
  // Insert one movie
  const res = yield db.collection('movies').insertOne(movie);
  db.close(); // Close connection
  return fromDbMovie(res.ops[0]);
}));

export const deleteMovie = (id) => dbInstance().then(db => co(function* gen() {
  // Delete one movie
  yield db.collection('movies').findOneAndDelete({ _id: new ObjectID(id) });
  db.close(); // Close connection
}));

export const editMovie = (id, obj) => dbInstance().then(db => co(function* gen() {
  // Edit one movie
  const res = yield db.collection('movies').findOneAndUpdate(
    { _id: new ObjectID(id) },
    obj,
    {
      returnOriginal: false,
    }
  );
  db.close(); // Close connection
  return fromDbMovie(res.value);
}));
