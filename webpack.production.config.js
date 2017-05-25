var webpack = require('webpack');
var path = require('path');

var ROOT_PATH = path.resolve(__dirname);
var BUILD_PATH = path.resolve(ROOT_PATH, 'public/js');

var entries = require('./bundle_entries');

module.exports = {
  devtool: 'source-map',

  entry: entries,

  output: {
    path: BUILD_PATH,
    filename: '[name]_build.min.js'
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        query: {
          presets: ['es2015']
        }
      }, {
        test: /\.scss$/,
        loaders: [
          'style-loader', 'css-loader', 'sass-loader', 'postcss-loader'
        ]
      }, {
        test: /\.(png|jpg)$/,
        loader: 'url?limit=40000'
      }
    ]
  },

  plugins: [
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      }
    })
  ]
};
