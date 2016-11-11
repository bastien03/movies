function initConfig() {
  let config;
  const envConfig = process.env.NODE_ENV;
  if (envConfig === 'production') {
    config = require('../config/production.json');
  } else if (envConfig === 'test') {
    config = require('../config/development.json');
  } else {
    config = require('../config/development.json');
  }
  config.isTestEnv = envConfig === 'test';
  return config;
}

module.exports = {
  config: initConfig(),
};
