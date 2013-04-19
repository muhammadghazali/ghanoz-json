
/**
 * Eksternal modules
 */
var
  express = require('express'),
  http = require('http'),
  path = require('path'),
  MongoClient = require('mongodb').MongoClient;

var app = module.exports = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.use(function (req, res, next) {
  MongoClient.connect('mongodb://localhost:27017/ghanoz_json',
    function (err, db) {
      if (!err) {
        req.mongodb = db;
        next();
      }
    });
});
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
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

/**
 *
 */
function checkRequestedContentType (req, res, next) {
  if (req.accepts('application/json') || req.accepts('application/xml'))
    next();
  else
    res.send(406, 'Sorry, we only provide resources in JSON and XML.');
}

var routes = require('./routes');

app.all('*', checkRequestedContentType);

app.get('/', routes.main.index);

app.get('/event/:id', routes.event.details);

http.createServer(app).listen(app.get('port'), function () {
  console.log('Express server listening on port ' + app.get('port'));
});