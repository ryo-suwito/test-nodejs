
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var stockRouter = require('./routes/klikdaily');

const { Sequelize } = require('sequelize');
const dotenv = require('dotenv');
dotenv.config();
const { exit } = require('process');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/klikdaily', stockRouter);

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
var sequelize = new Sequelize('postgres://'+process.env.DB_USER+
  ':'+process.env.DB_PASSWORD+'@'+process.env.DB_HOST+':'+process.env.DB_PORT+'/'+process.env.DB_NAME)


async function dbConnection() {
  try {
    await sequelize.authenticate();
    console.log('Database connected.');
  } catch (error) {
    console.error('Database connection failed to establish:\n', error);
    console.log("Shutting down program...");
    exit();
  }
}

dbConnection().catch(error => console.log(error.stack));

module.exports = { app, sequelize };
