var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');
var dotenv = require('dotenv')
dotenv.config({ path: "./config/.env" })
var usersRouter = require('./routes/user/users');
const { verifyToken } = require('./middleware/verifyAccessToken');
const session=require('express-session')
var app = express();

app.use(
  session({
    secret: "ësofijhesjkfjogihlrfknkeorjkl",
    resave: false,
    saveUninitialized: false,
  })
);
app.use(logger('dev'));
app.use(cors());
app.use(express.json());

app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api/v1/users', usersRouter);

app.set('port', 5000)

app.use(function (req, res, next) {
  next(createError(404));
});

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", process.env.BASE_URL);
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});


// error handler
app.use(function (err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  res.status(err.status || 500).json({
    message: err.message,
    status: false
  });

});



module.exports = app;
