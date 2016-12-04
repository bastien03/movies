import Movie from '../domain/Movie';
const ObjectID = require('mongodb').ObjectID;

const addMovie = movie => new Movie(movie).save();
const deleteMovie = movieId => Movie.remove({ _id: movieId });
const getMovie = movieId => Movie.findById(movieId);
const getMovies = () => Movie.find({});
const getMoviesWithMissingTitle = () => Movie.find({ $or: [
  { 'title.de': '' },
  { 'title.en': '' },
  { 'title.fr': '' },
] });
const getMoviesWithMissingCountry = () => Movie.find({ country: '' });
const updateMovie = (movieId, movie) => Movie.findByIdAndUpdate(movieId, movie, { new: true });

const updateMovies = (movies) => {
  const bulk = Movie.collection.initializeUnorderedBulkOp();
  movies.forEach((m) => {
    const movieToUpdate = Object.assign({}, m);
    delete movieToUpdate.id;
    bulk.find({ _id: new ObjectID(m.id) }).updateOne(movieToUpdate);
  });
  return bulk.execute();
};

const ranges = [
  1900, 1910, 1920, 1930, 1940, 1950, 1960,
  1970, 1980, 1990, 2000, 2010, 2020,
];
const rangeProj = {
  $concat: []
};

for (let i = 1; i < ranges.length; i++) {
  rangeProj.$concat.push({
    $cond: {
      if: {
        $and: [{
          $gte: ['$year', ranges[i - 1]],
        }, {
          $lt: ['$year', ranges[i]],
        }],
      },
      then: `${ranges[i - 1]}-${ranges[i]}`,
      else: '',
    },
  });
}

const getStatistics = () => Promise.all(
  [
    Movie.aggregate({
      $group: {
        _id: '$country',
        count: { $sum: 1 },
      },
    }),
    Movie.aggregate({
      $group: {
        _id: '$director',
        count: { $sum: 1 },
      },
    }),
    Movie.aggregate([{
      $project: { "_id": 0, "range": rangeProj }
    }, {
      $group: { _id: "$range", count: { $sum: 1 } }
    }, {
      $sort: { "_id": 1 }
    }]),
  ],
).then(data => ({
  groupByCountry: data[0],
  groupByDirector: data[1],
  groupByDecade: data[2],
}));

const repo = {
  addMovie,
  deleteMovie,
  getMovie,
  getMovies,
  getMoviesWithMissingTitle,
  getMoviesWithMissingCountry,
  getStatistics,
  updateMovie,
  updateMovies,
};

export default repo;
