function initConfig() {
  let config;
  const envConfig = process.env.NODE_ENV;
  if (envConfig === 'production') {
    config = require('../config/production.json');
  } else if (envConfig === 'test') {
    config = require('../config/development.json');
    config.dbManager = require('../tests/testdbManager.js').default;
  } else {
    config = require('../config/development.json');
  }
  return config;
}

module.exports = {
  config: initConfig(),
};
