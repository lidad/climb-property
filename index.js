const path = require('path');
const express = require('express');
const routes = require('./server/routes');
const pkg = require('./package');
const config = require('./server/config');

const app = express();
const isDev = process.env.NODE_ENV !== 'production';

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));

app.locals.env = process.env.NODE_ENV || 'dev';
app.locals.reload = true;
app.locals.fangAnalysis = {
  title: '房产交易分析',
  description: pkg.description
}

if (isDev) {
  const webpack = require('webpack');
  const webpackDevMiddleware = require('webpack-dev-middleware');
  const webpackHotMiddleware = require('webpack-hot-middleware');
  const webpackDevConfig = require('./webpack.config.js');

  const compiler = webpack(webpackDevConfig);

  app.use(webpackDevMiddleware(compiler, {
    publicPath: webpackDevConfig.output.publicPath,
    noInfo: true,
    stats: {
      colors: true
    }
  }));
  app.use(webpackHotMiddleware(compiler));
}

routes(app);

app.listen(config.port, function() {
  console.log(`${pkg.name} listening on port ${config.port}`);
});
