var path = require('path');
var ROOT_PATH = path.resolve(__dirname);
var APP_PATH = path.resolve(ROOT_PATH, 'src/js');

var entries = {
  'home': APP_PATH + '/home.js',
  'hangzhou': APP_PATH + '/hangzhou.js',
  'shanghai': APP_PATH + '/shanghai.js'
}

entries.vendor = ['echarts', 'superagent'];

module.exports = entries;
