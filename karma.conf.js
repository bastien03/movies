// karma.conf.js
module.exports = function karmaConf(config) {
  config.set({

    frameworks: ['jasmine'],
    browsers: ['Firefox'],
    reporters: ['mocha'],

    files: [
      // all files ending in "_tests"
      { pattern: 'tests/**/*_tests.js', watched: false },
     // each file acts as entry point for the webpack configuration
    ],

    preprocessors: {
      // add webpack as preprocessor
      'src/**/*.js*': ['webpack'],
      'tests/**/*_tests.js': ['webpack'],
    },

    webpack: {
      // karma watches the test entry points
      // (you don't need to specify the entry option)
      // webpack watches dependencies

      resolve: {
        extensions: ['', '.js', '.jsx'],
      },

      // webpack configuration
      module: {
        loaders: [
          {
            test: /\.jsx?$/,
            loader: 'babel',
            exclude: /node_modules/,
            include: __dirname,
            query: {
              presets: ['es2015', 'react'],
            },
          },
        ],
      },

      externals: {
        cheerio: 'window',
        'react/addons': true,
        'react/lib/ExecutionEnvironment': true,
        'react/lib/ReactContext': true,
      },
    },

    webpackMiddleware: {
      // webpack-dev-middleware configuration
      // i. e.
      stats: 'errors-only',
    },
  });
};
