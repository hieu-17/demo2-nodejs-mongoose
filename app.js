var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const expressLayouts = require('express-ejs-layouts');
const passport = require('passport');
const flash = require('connect-flash');
const session = require('express-session');
const { ensureAuthenticated } = require('./config/auth');
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
// Passport Config
require('./config/passport')(passport);

var mongoose = require('mongoose');

var app = express();

mongoose.connect('mongodb://localhost/data2', {useNewUrlParser: true});
// view engine setup

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
// Express session
app.use(
  session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
  })
);
// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// Connect flash
app.use(flash());

// Global variables
app.use(function(req, res, next) {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error = req.flash('error');
  next();
});
app.use(express.static(path.join(__dirname, 'public')));
app.use("/css",express.static(__dirname + '/css'));
app.use("/documentation",express.static(__dirname + '/documentation'));
app.use("/fonts",express.static(__dirname + '/fonts'));
app.use("/images",express.static(__dirname + '/images'));
app.use("/js",express.static(__dirname + '/js'));
app.use("/pages",express.static(__dirname + '/pages'));
app.use("/partials",express.static(__dirname + '/partials'));
app.use("/scss",express.static(__dirname + '/scss'));
app.use("/vendors",express.static(__dirname + '/vendors'));

app.use('/users',expressLayouts,usersRouter);
app.use('/',ensureAuthenticated, indexRouter);


app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});
module.exports = app;
