import express from 'express';
import session from 'express-session';
import mongoose from 'mongoose';
import passport from 'passport';

import routes from './routes';
import models from './models';
import oauth from './oauth';

const app = express();

// Constants
const DBNAME = 'fcc-gitter-app';
const VIEWDIR = process.cwd() + '/dist/client/views';

app.set('port', (process.env.PORT || 5050));

app.set('view engine', 'ejs');
app.set('views', VIEWDIR);
app.use('/public', express.static('./dist/client/public'));

// Store sessions
app.use(session({
  secret: process.env.COOKIE_KEY,
  resave: false,
  saveUninitialized: true,
  cookie: {
    // 10 minutes before sign out
    maxAge: 60000 * 10
  }
}));

// Start passport
app.use(passport.initialize());
app.use(passport.session());

// Use native promises
mongoose.Promise = global.Promise;

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/' + DBNAME);

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  oauth(models);
  routes(app, models);
});

app.listen(app.get('port'), () => console.log(`Node.js listening on port ${app.get('port')}...`));
