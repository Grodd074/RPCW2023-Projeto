var createError = require('http-errors');
var express = require('express');
var logger = require('morgan');

const { v4: uuidv4 } = require('uuid')
var session = require('express-session')
var passport = require('passport')
var LocalStrategy = require('passport-local').Strategy

//Import the mongoose module
var mongoose = require('mongoose');
//Set up default mongoose connection
var mongoDB = process.env.MONGODB_URL;
mongoose.connect(mongoDB, {useNewUrlParser: true, useUnifiedTopology: true});
//Get the default connection
var db = mongoose.connection;
//Bind connection to error event (to get notification of connection errors)
db.on('error', console.error.bind(console, 'MongoDB connection error...'));
db.once('open', function() {
   console.log("Conexão ao MongoDB realizada com sucesso...")
});


var usersRouter = require('./routes/users');

var app = express();

app.use(session({
  genid: req => {
    return uuidv4()},
  secret: 'rpcw2023',
  resave: false,
  saveUninitialized: true
}))

// Configuração do passport
var User = require('./models/user')
passport.use(new LocalStrategy(User.authenticate()))
passport.serializeUser(User.serializeUser())
passport.deserializeUser(User.deserializeUser())

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(passport.initialize());
app.use(passport.session());

app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use('*', function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.jsonp({error: err.message});
});

module.exports = app;
