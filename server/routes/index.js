module.exports = (app) => {
  app.get('/', (req, res) => {
    res.redirect('/home');
  });
  app.use('/home', require('./home'));
  app.use('/hangzhou', require('./hangzhou'));
  app.use('/shanghai', require('./shanghai'));
}
