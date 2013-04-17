
/**
 * Eksternal modules
 */
var
  express = require('express'),
  http = require('http'),
  path = require('path');

var app = module.exports = express();

// all environments
app.set('port', process.env.PORT || 3000);
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

app.get('/', function (req, res) {
  res.send('ghanozjson Web API!');
});

http.createServer(app).listen(app.get('port'), function () {
  console.log('Express server listening on port ' + app.get('port'));
});
