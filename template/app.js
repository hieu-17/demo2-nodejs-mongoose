var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var authRouter = require('./routes/auth.route')
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

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

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/auth', authRouter)
// catch 404 and forward to error handler
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
