const co = require('co');

exports.id = '2017.05.001';
exports.description = '⇨ Movies should have a valid country.';

exports.execute = (db) => co(function*() {
  const collection = db.collection('movies');
  const movies = yield collection.find().toArray();

  const getCountry = (country) => {
    switch (country) {
      case 'australia':
        return 'AU';
      case 'austria':
        return 'AT';
      case 'belgium':
        return 'BE';
      case 'canada':
        return 'CA';
      case 'columbia':
        return 'CO';
      case 'fi':
        return 'FI';
      case 'france':
        return 'FR';
      case 'germany':
        return 'DE';
      case 'haiti':
        return 'HT';
      case 'iran':
        return 'IR';
      case 'italy':
        return 'IT';
      case 'japan':
        return 'JP';
      case 'new-zealand':
        return 'NZ';
      case 'norway':
        return 'NO';
      case 'saudi-arabia':
        return 'SA';
      case 'serbia':
        return 'RS';
      case 'south-africa':
        return 'ZA';
      case 'spain':
        return 'ES';
      case 'thailand':
        return 'TH';
      case 'turkey':
        return 'TR';
      case 'united-kingdom':
        return 'GB';
      case 'usa':
        return 'US';
      default:
        return 'xxx';
    }
  };

  yield movies.map((movie) => collection.updateOne({
    _id: movie._id
  }, {
    $set: {
      country: getCountry(movie.country)
    }
  }));
}).catch((err) => {
  console.log(err.stack);
});
