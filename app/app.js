
// external modules
var
  express = require('express'),
  http = require('http'),
  path = require('path'),
  MongoClient = require('mongodb').MongoClient;

// internal modules
var middlewares = require('./middlewares');

var app = module.exports = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
// custom middlewares
app.use(middlewares.acceptedFormat());
app.use(middlewares.output());
app.use(middlewares.mongoConnection());
app.use(app.router);

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler({dumpExceptions: true, showStack: true}));
}

// production only
if ('production' == app.get('env')) {
  app.use(express.errorHandler({dumpExceptions: true}));
}

// testing only
if ('testing' == app.get('env')) {
  app.use(express.errorHandler({dumpExceptions: true, showStack: true}));
}

var routes = require('./routes');

app.get('/', routes.main.index);

app.get('/event/:id', routes.event.details);

app.get('/events', routes.event.list);

http.createServer(app).listen(app.get('port'), function () {
  console.log('Express server listening on port ' + app.get('port'));
});