const path = require('path');
const express = require('express');
const routes = require('./routes');
const pkg = require('./package');
var config = require('./config');

const app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));

app.locals.fangAnalysis = {
  title: '房产交易分析',
  description: pkg.description
}

routes(app);

app.listen(config.port, function() {
  console.log(`${pkg.name} listening on port ${config.port}`);
});
