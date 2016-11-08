var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');


var routes = require('./server/routes/index');
var users = require('./server/routes/users');


var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/scrumdb', function(err, res) {
  if(err) {
    console.log('ERROR: connecting to Database. ' + err);
  }else {
    console.log("Database localhost:27017/scrumdb ");
  }
  
});

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'server/views'));
app.set('view engine', 'jade');
// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));

app.use(express.static(__dirname + '/public'));

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'server')));


// Import Models and controllers
var models = require('./models/scrumdb')(app, mongoose);
var ProjectsCtrl = require('./models/projects');

// api routes
app.use('/', routes);
app.use('/users', users);
require('./server/routes/projects')(app, ProjectsCtrl);

// Ressources route

app.use('/js', express.static(__dirname + '/node_modules/angular')); // redirect angular
app.use('/js', express.static(__dirname + '/node_modules/angular-route')); // redirect JS angular
app.use('/js', express.static(__dirname + '/node_modules/angular-resource')); // redirect JS angular
app.use('/js', express.static(__dirname + '/node_modules/angular-aria')); // redirect JS jQuery
app.use('/js', express.static(__dirname + '/node_modules/bootstrap/dist/js')); // redirect bootstrap JS
app.use('/js', express.static(__dirname + '/node_modules/jquery/dist')); // redirect JS jQuery
app.use('/js', express.static(__dirname + '/node_modules/angular-material')); // redirect JS jQuery
app.use('/js', express.static(__dirname + '/node_modules/angular-animate')); // redirect JS jQuery
app.use('/css', express.static(__dirname + '/node_modules/angular-material')); // redirect JS jQuery
app.use('/css', express.static(__dirname + '/node_modules/bootstrap/dist/css')); // redirect CSS bootstrap
app.use('/fonts/', express.static(path.join(__dirname, '/node_modules/bootstrap/fonts')));
app.use('/public', express.static(__dirname + '/public'));
app.use('/partials',express.static(path.join(__dirname, '/public/views')));

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

require("jsdom").env("", function(err, window) {
  if (err) {
    console.error(err);
    return;
  }
  var $ = require("jquery")(window);
});

module.exports = app;

app.listen(8080);
console.log("App listening on port 8080");
