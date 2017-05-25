var webpack = require('webpack');
var path = require('path');

var ROOT_PATH = path.resolve(__dirname);
var BUILD_PATH = path.resolve(ROOT_PATH, 'public/js');

var entries = require('./bundle_entries');
var hotMiddlewareScript = 'webpack-hot-middleware/client?reload=true';

for (let enKey in entries) {
  if (entries.hasOwnProperty(enKey)) {
    entries[enKey] = [].concat(entries[enKey]).concat(hotMiddlewareScript);
  }
}

module.exports = {
  devtool: 'eval-source-map',

  entry: entries,

  output: {
    path: BUILD_PATH,
    filename: '[name]_build.min.js',
    publicPath: 'http://localhost:3000/'
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
        loaders: ['style-loader', 'css-loader', 'sass-loader', 'postcss-loader']
      }, {
        test: /\.(png|jpg)$/,
        loader: 'url?limit=40000'
      }
    ]
  },

  plugins: [new webpack.HotModuleReplacementPlugin(), new webpack.NoEmitOnErrorsPlugin()]
};
