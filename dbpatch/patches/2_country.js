const co = require('co');

exports.id = '2016.12.002';
exports.description = '⇨ Movies should now have a country field.';

exports.execute = (db) => co(function* () {
  const collection = db.collection('movies');
  const movies = yield collection.find().toArray();

  const isOneOf = (director, directorList) => {
    let isInTheList = false;
    for (const dir of directorList) {
      isInTheList = director.includes(dir) ? true : isInTheList;
    }
    return isInTheList;
  };

  const getCountry = (director) => {
    if (isOneOf(director,
      ['anderson', 'scorsese', 'kubrick', 'jarmusch', 'hitchcock', 'willimon',
        'coppola', 'moore', 'pollack', 'spielberg']
    )) {
      return 'usa';
    } else if (isOneOf(director,
      ['truffaut', 'godard', 'lelouch', 'rohmer', 'resnais', 'blier',
        'pialat', 'tati', 'besson', 'renoir', 'hunebelle', 'carne']
    )) {
      return 'france';
    } else if (isOneOf(director, ['akin', 'wenders'])) {
      return 'germany';
    } else if (isOneOf(director, ['rossellini', 'fellini'])) {
      return 'italy';
    } else if (isOneOf(director, ['loach'])) {
      return 'united-kingdown';
    }
    return '';
  };

  yield movies.map((movie) => collection.updateOne(
    {
      _id: movie._id
    },
    {
      $set: {
        country: getCountry(movie.director)
      }
    })
  );
}).catch((err) => {
  console.log(err.stack);
});
