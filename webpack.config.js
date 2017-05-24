var webpack = require('webpack');
var path = require('path');

var ROOT_PATH = path.resolve(__dirname);
var APP_PATH = path.resolve(ROOT_PATH, 'src');
var BUILD_PATH = path.resolve(ROOT_PATH, 'public/js');

var entries = {
  'home': APP_PATH + '/js/home.js',
  'hangzhou': APP_PATH + '/js/hangzhou.js',
  'shanghai': APP_PATH + '/js/shanghai.js'
};
entries.vendor = ['echarts', 'superagent'];

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
        ],
        include: APP_PATH
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
