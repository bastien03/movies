var path = require('path'); // eslint-disable-line no-var
var webpack = require('webpack'); // eslint-disable-line no-var

const env = process.env.NODE_ENV;
const isProd = env === 'production';
const bundle = isProd ? 'prod.bundle.js' : 'bundle.js';

module.exports = {
  devtool: 'inline-source-map',
  entry: [
    'webpack-hot-middleware/client',
    './src/client.js',
  ],
  output: {
    path: path.join(__dirname, 'public'),
    filename: bundle,
    // publicPath: '/static/',
  },
  // output: {
  //   path: './build/public',
  //   filename: 'client.bundle.js',
  //   publicPath: '',
  // },
  plugins: [
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
  ],
  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel',
        exclude: /node_modules/,
        include: __dirname,
        query: {
          presets: ['react-hmre'],
        },
      },
      {
        test: /\.css$/,
        loader: 'style-loader!css-loader',
      },
    ],
  },
};
