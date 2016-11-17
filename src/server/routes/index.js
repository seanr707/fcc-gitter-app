import auth from './auth';

export default (app, models) => {
  app.route('/')
    .get((req, res) => res.render('index'));

  app.route('/page/*')
    .get((req, res) => res.render('index'));

  auth(app, models);
};
