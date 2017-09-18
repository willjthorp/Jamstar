const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const mongoose     = require("mongoose");
const session = require("express-session");
const flash = require("connect-flash");
const passport = require('./helpers/passport');
const expressLayouts = require('express-ejs-layouts');

const app = express();

// Controllers
const index = require('./routes/index');
const auth = require('./routes/auth');
const profile = require('./routes/profile');
const jams = require('./routes/jams');
const musicians = require('./routes/musicians');
const groups = require('./routes/groups');
const api = require('./routes/api');

// Mongoose configuration
mongoose.connect("mongodb://localhost/second-project");

// view engine setup
app.set('layout', 'layouts/main-layout');
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

//initialize passport and session here
app.use(session({
  secret: "our-passport-local-strategy-app",
  resave: true,
  saveUninitialized: true,
  rolling: true,
  cookie: { maxAge: 600000 },
}));  // Do I need the mongo store thing if I'm using passport?

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(expressLayouts);

app.use(flash());

app.use(passport.initialize());
app.use(passport.session());

// Routes
app.use('/', index);
app.use('/', auth);
app.use('/profile', profile);
app.use('/jams', jams);
app.use('/musicians', musicians);
app.use('/groups', groups);
app.use('/api', api);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error', {req});
});

module.exports = app;
