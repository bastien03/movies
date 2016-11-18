/* eslint-disable
      no-console, global-require,
      import/no-dynamic-require,
      import/no-extraneous-dependencies
*/
const MongoClient = require('mongodb').MongoClient;
const co = require('co');
const normalizedPath = require('path').join(__dirname, 'js');

const dbUrl = process.env.dev === 'prod' ?
  require('../config/production.json').DATABASE_URL :
  require('../config/development.json').DATABASE_URL;

const patches = [];
require('fs').readdirSync(normalizedPath).forEach((file) => {
  patches.push({
    name: file,
    module: require(`./js/${file}`),
  });
});

console.log('---');
console.log('Found patches', patches.map(patch => patch.name));

co(function* () {
  const db = yield MongoClient.connect(dbUrl);

  // ------
  // 1. Get last executed patch from database
  // ------
  console.log('---');
  const collection = db.collection('patches');

  // yield collection.insertMany([
  //   { id: '2016.11.001', executionDate: new Date().toISOString() },
  //   { id: '2016.11.002', executionDate: new Date().toISOString() },
  //   { id: '2016.11.003', executionDate: new Date().toISOString() },
  // ]);

  const executedPatch = yield collection.find().sort({ patchId: -1 }).limit(1).toArray();
  const lastPatch = executedPatch[0];
  console.log(`Last executed patch is: '${lastPatch.patchId}' on ${lastPatch.executionDate}`);

  // ------
  // 2. Execute new patches
  // ------
  console.log('---');
  const newPatches = patches.filter(patch => patch.module.getId() > lastPatch.patchId);
  console.log('Patches to be executed:', newPatches.map(patch => patch.name));

  newPatches.forEach((patch) => {
    console.log('-');
    console.log(`Name: ${patch.name}`);
    console.log(`Description:\n${patch.module.getDescription()}`);
    patch.module.execute(db);
  });

  // Close the connection
  // db.close();
}).catch((err) => {
  console.log(err.stack);
});
