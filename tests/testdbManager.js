import find from 'lodash/find';
import remove from 'lodash/remove';
import { ObjectID } from 'mongodb';

let movies = [
  // { _id: new ObjectID('57108bbfa17e3eb0e846e787'), director: 'mervyn-leRoy', title: 'Little Caesar', url: 'http://www.youtube.com/watch?v=dBLVJW8ULxY', year: '1931' },
];

const users = [
  { _id: new ObjectID(), username: 'bastien', password: 'asdasd' },
];

const collections = {
  users: {
    find: (param) => {
      const res = param ?
        param.username ?
          [find(users, { username: param.username })] :
          [find(users, { _id: param._id })]
       : users;
      return {
        toArray: () => res,
        limit: () => ({
          next: () => res[0],
        }),
      };
    },
  },
  movies: {
    find: (param) => {
      const res = param ?
        [find(movies, { _id: param._id })] // eslint-disable-line no-underscore-dangle
        : movies;
      return {
        toArray: () => res,
      };
    },
    insertOne: (movie) => {
      const dbMovie = Object.assign({}, movie, {
        _id: new ObjectID(), // eslint-disable-line no-underscore-dangle
      });
      movies.push(dbMovie);
      return { ops: [dbMovie] };
    },
    findOneAndDelete: (param) => {
      remove(movies, { _id: param._id });
      return {};
    },
    findOneAndUpdate: (idObj, obj) => {
      remove(movies, { _id: idObj._id });
      const updatedMovie = Object.assign({}, obj, {
        _id: idObj._id,
      });
      movies.push(updatedMovie);
      return { value: updatedMovie };
    },
  },
};

const db = {
  collection: (name) => collections[name],
  close: () => {},
};

export default () => Promise.resolve(db);
