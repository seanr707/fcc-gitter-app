import passport from 'passport';
import { callback } from './utility';

export default (app, models) => {
  app.route('/auth/gitter')
    .get(passport.authenticate('gitter'));

  app.route('/auth/gitter/callback')
    .get(
      passport.authenticate('gitter', {
        successRedirect: '/',
        failureRedirect: '/'
      })
    );

  app.route('/auth/check')
    .get((req, res) => {
      console.log(req.session.passport);
      if (!req.session.passport) {
        return res.send(false);
      }
      console.log(`Token: ${req.session.passport.user.token}`);
      return res.send(req.session.passport.user);
      // const id = { gitterId: req.session.passport.user.profile.id };
      // return models.User.findOne(id, callback(res));
    });
};
