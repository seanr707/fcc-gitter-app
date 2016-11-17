import passport from 'passport';
import { Strategy } from 'passport-gitter';

export default models => {
  passport.use(new Strategy(
    {
      clientID: process.env.GITTER_CONSUMER_KEY,
      clientSecret: process.env.GITTER_CONSUMER_SECRET,
      callbackURL: process.env.CALLBACK_URL || 'http://127.0.0.1:5050/auth/gitter/callback'
    },
      (token, tokenSecret, profile, done) => {
        const user = {
          token,
          profile
        };

        console.log('User');
        console.log(user);

        /*
        models.User.findOrCreate({ gitterId: profile.id }, function (err, user) {
          return done(err, user);
        });
        */

        /*
        const id = { twitterId: profile.id };

        models.User.findOne(id, (err, user) => {
          if (err) return err;

          if (!user || user.length === 0) {
            const addUser = new models.User({
              twitterId: profile.id,
              name: profile.displayName,
              screenName: profile.username,
              location: profile._json.location,
              url: profile._json.url,
              profileImageUrl: profile._json.profile_image_url_https
            });

            addUser.save(err => console.error(err));
          } else if (user.name !== profile.displayName ||
            user.profileImageUrl !== profile.profile_image_url_https) {
            user = {
              twitterId: profile.id,
              name: profile.displayName,
              screenName: profile.username,
              location: profile._json.location,
              url: profile._json.url,
              profileImageUrl: profile._json.profile_image_url_https
            };
            models.User.findOneAndUpdate(id, user);
          }
        });
        */

        done(null, user);
      }
  ));

  // Serialize user in and out of session
  passport.serializeUser((user, cb) => {
    cb(null, user);
  });

  passport.deserializeUser((obj, cb) => {
    cb(null, obj);
  });
};
