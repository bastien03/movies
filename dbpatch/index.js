/* eslint-disable
      no-console, global-require,
      import/no-dynamic-require,
      import/no-extraneous-dependencies
*/
const MongoClient = require('mongodb').MongoClient;
const co = require('co');
const schemaValidator = require('./util/schemaValidator.js');
const moduleLoader = require('./util/moduleLoader.js');
const Log = require('log');

const patchDirectory = 'patches';
const log = new Log();

// retrieve configuration corresponding to the given environment
const dbUrl = process.env.NODE_ENV === 'prod' ?
  require('../config/production.json').DATABASE_URL :
  require('../config/development.json').DATABASE_URL;

// retrieve all modules found in the patch directory
const patches = moduleLoader.load(patchDirectory);

console.log('---');
console.log('Found patches', patches.map((patch) => patch.name));

// Description of the elements that have to be exported by each patch module
const patchSchema = {
  id: 'string',
  description: 'string',
  execute: 'function'
};

try {
  schemaValidator.validate(patches, patchSchema);
} catch (err) {
  console.log('');
  log.error(`There is a problem with one patch.\n✗ ${err.message}`);
  console.log('');
  process.exit();
}

let db;

co(function* () {
  db = yield MongoClient.connect(dbUrl);

  // ------
  // 1. Get last executed patch from database
  // ------
  console.log('---');
  const collection = db.collection('patches');

  const executedPatch = yield collection.find()
    .sort({ id: -1 }).limit(1).toArray();
  const lastPatch = executedPatch[0];

  if (lastPatch) {
    const lastOne = patches.filter((p) => p.module.id === lastPatch.id)[0];
    const lastPatchName = lastOne ? `(${lastOne.name})` : '';
    console.log(`Last executed patch is: '${lastPatch.id}' ${lastPatchName} ` +
      `on ${lastPatch.executionDate}.`);
  } else {
    console.log('No patch has been already executed.');
  }

  // ------
  // 2. Execute new patches
  // ------
  console.log('---');
  let newPatches;
  if (lastPatch) {
    newPatches = patches.filter((patch) =>
      patch.module.id > lastPatch.id);
  } else {
    newPatches = Object.assign([], patches);
  }
  if (newPatches && newPatches.length > 0) {
    console.log('Patches to be executed:', newPatches.map((p) => p.name));
  } else {
    console.log('No patch to execute.');
  }
  console.log('');

  for (const patch of newPatches) {
    console.log(`➤ ${patch.name}`);
    console.log(`\tDescription:\n\t\t${patch.module.description}`);
    yield patch.module.execute(db);
    yield collection.insertOne({
      id: patch.module.id,
      executionDate: new Date().toISOString()
    });
    console.log(`\t✓ Patch ${patch.name} has been successfully executed.`);
  }

  if (newPatches && newPatches.length > 0) {
    console.log('');
    console.log('✓ All migrations scripts have been successfully executed.');
    console.log('');
  }

  db.close();
}).catch((err) => {
  if (db) {
    try {
      db.close();
    } catch (e) {
      // nothing more to do
      // we've tried to close the connection but there seems to be a problem
      // with the database instance
    }
  }

  console.error(err.stack);
  process.exit();
});
