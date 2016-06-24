function initConfig() {
  let config;
  if (process.env.APP_PROFILE === 'production') {
    config = require('../config/production.json');
  } else {
    config = require('../config/development.json');
  }
  return config;
}

module.exports = {
  config: initConfig(),
};
