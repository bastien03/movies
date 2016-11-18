const co = require('co');

exports.getId = () => '2016.11.003';
exports.getDescription = () => '⇨ Movies should now have their title in 3 ' +
  'different languages (de, en, fr) and have a default value.\n' +
  '⇨ The existing title is set as default and can be used if a translation ' +
  'does not exist in a given language.';

exports.execute = (db) => {
  co(function* () {
    const collection = db.collection('movies3');
    const movies = yield collection.find().toArray();

    console.log(`${movies.length} movies need to be modified`);

    // try to automatically recognize english titles
    const copyIfEnglish = title =>
      title.toLowerCase().includes('the ') || title.toLowerCase().includes('of ')
      ? title : '';

    yield movies.map(movie => collection.updateOne(
      {
        _id: movie._id
      },
      {
        $set: {
          newTitle: {
            de: '',
            en: copyIfEnglish(movie.title),
            fr: '',
            default: movie.title
          }
        }
      })
    );

    // TO BE CHANGED
    // db connection should be closed here but after all migration scripts have
    // been executed.
    db.close();
  }).catch((err) => {
    console.log(err.stack);
  });
};
