const co = require('co');

exports.id = '2016.11.001';
exports.description = '⇨ Movies should now have their title in 3 ' +
  'different languages (de, en, fr) and have a default value.\n' +
  '\t\t⇨ The existing title is set as default and can be used if a ' +
  'translation does not exist in a given language.\n' +
  '\t\t⇨ Some assumptions are made to try to recognize the language of the ' +
  'existing title in order to prefill the corresponding fiel automatically.';

exports.execute = (db) => co(function* () {
  const collection = db.collection('movies');
  const movies = yield collection.find().toArray();

  // try to automatically recognize english titles
  const copyIfEnglish = title =>
    title.toLowerCase().includes('the ') || title.toLowerCase().includes('of ')
    ? title : '';

  // try to automatically recognize french titles
  const copyIfFrench = title =>
    title.toLowerCase().includes('le ') || title.toLowerCase().includes('la ')
    ? title : '';

  yield movies.map((movie) => collection.updateOne(
    {
      _id: movie._id
    },
    {
      $set: {
        title: {
          de: '',
          en: copyIfEnglish(movie.title),
          fr: copyIfFrench(movie.title),
          default: movie.title
        }
      }
    })
  );
}).catch((err) => {
  console.log(err.stack);
});
