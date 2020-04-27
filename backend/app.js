var createError = require('http-errors');
var express = require('express');
var cookieParser = require('cookie-parser');
var session = require('express-session');
const cors = require('cors');

var path = require('path');
var fs = require('fs');
const morgan = require('morgan');
const logPut = './logs';
const logger = require('./configs/logger4jsInit')

//routers path
var homeRouter = require('./routes/homeRouter');
var apiRouter = require('./routes/api/apiRouter');
var viewRouter = require('./routes/view/viewRouter');


var app = express();

//Set view engine
app.set("view engine", "hbs");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

//logger morgan
app.use(morgan('common', {
  stream: fs.createWriteStream(logPut+'/morgan.log', {flags: 'a'})}))
app.use(morgan('dev'));

//routers
app.use('/', homeRouter);
app.use('/view', viewRouter);
app.use('/api', apiRouter);

//Start
logger.info('Start');
logger.debug('Start debug');

app.use('/static', express.static(__dirname + '/views/scripts'));
app.use(cors);
app.use(function (req, res, next) {
//Enable CORS
  app.use(bodyParser.urlencoded({ extended: true }));
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, HEAD, POST, PUT, DELETE, OPTIONS");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, x-client-key, x-client-token, x-client-secret, Authorization");
  next();
});

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
