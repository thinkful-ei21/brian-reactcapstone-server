'use strict';

const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const mongoose = require('mongoose');
const passport = require('passport');
mongoose.Promise = global.Promise;

const bodyParser = require('body-parser');
const { PORT, CLIENT_ORIGIN } = require('./config');
const { dbConnect } = require('./db-mongoose');
// const {dbConnect} = require('./db-knex');
const lyricsRouter = require('./routes');
const { router: usersRouter } = require('./users');
const { router: authRouter, localStrategy, jwtStrategy } = require('./auth');
const app = express();

app.use(
  morgan(process.env.NODE_ENV === 'production' ? 'common' : 'dev', {
    skip: (req, res) => process.env.NODE_ENV === 'test'
  })
);
////CORS STUFF
app.use(
  cors({
    origin: CLIENT_ORIGIN
  })
);

app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Content-Type,Authorization');
  res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,PATCH,DELETE');
  if (req.method === 'OPTIONS') {
    return res.send(204);
  }
  next();
});
passport.use(localStrategy);
passport.use(jwtStrategy);

app.use('/api/users/', usersRouter);
app.use('/api/auth/', authRouter);
app.use(bodyParser.json());
app.use('/api/created',lyricsRouter);

const jwtAuth = passport.authenticate('jwt', { session: false });

app.get('/api/protected', jwtAuth, (req, res) => {
  return res.json({
    data: 'rosebud'
  });
});

// app.get('/api/cheeses',( req, res, next) => {
//   const testing = [
//     'Bath Blue',
//     'Barkham Blue',
//     'Buxton Blue',
//     'Cheshire Blue',
//     'Devon Blue',
//     'Dorset Blue Vinney',
//     'Dovedale',
//     'Exmoor Blue',
//     'Harbourne Blue',
//     'Lanark Blue',
//     'Lymeswold',
//     'Oxford Blue',
//     'Shropshire Blue',
//     'Stichelton',
//     'Stilton',
//     'Blue Wensleydale',
//     'Yorkshire Blue'
//   ];
//   res.json(testing);
// });


function runServer(port = PORT) {
  const server = app
    .listen(port, () => {
      console.info(`App listening on port ${server.address().port}`);
    })
    .on('error', err => {
      console.error('Express failed to start');
      console.error(err);
    });
}

if (require.main === module) {
  dbConnect();
  runServer();
}



module.exports = { app, runServer };
