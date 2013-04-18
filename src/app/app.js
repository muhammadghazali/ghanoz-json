
/**
 * Eksternal modules
 */
var
  express = require('express'),
  http = require('http'),
  path = require('path'),
  easyXML = require('easyxml');

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

/**
 *
 */
function checkRequestedContentType (req, res, next) {
  if (req.accepts('application/json') || req.accepts('application/xml'))
    next();
  else
    res.send(406, 'Sorry, we only provide resources in JSON and XML.');
}

app.all('*', checkRequestedContentType);

app.get('/', function (req, res) {
  res.send('ghanozjson Web API!');
});

app.get('/event/:id', function (req, res) {

  if (req.params.id && req.accepts('application/json')) {
    res.set('Content-Type', 'application/json');
    res.json({
      "url": "http://example.com/event/511206849146c42125000001",
      "data": {
        "title": "Free event",
        "shortDescription": "Free event for students",
        "times": [
          {
            "milliseconds": 1613028781634,
            "fullFormat": "Thu Feb 11 2021 14:33:01 GMT+0700 (WIT)",
            "year": 2021,
            "month": 1,
            "date": 11,
            "day": 1
          }
        ],
        "isPassed": false,
        "rating": 3,
        "lastUpdated": 1612928781634,
        "timestamp": 1612928781634,
        "id": "511206849146c42125000001"
      }
    });
  } else if (req.params.id && req.accepts('application/xml')) {
    res.set('Content-Type', 'application/xml');
    easyXML.configure({
      singularizeChildren: true,
      underscoreAttributes: true,
      rootElement: 'response',
      dateFormat: 'ISO',
      manifest: false,
      indent: 2
    });
    res.send(200, easyXML.render({
      "url": "http://example.com/event/511206849146c42125000001",
      "event": {
        "title": "Free event",
        "shortDescription": "Free event for students",
        "times": [
          {
            "milliseconds": 1613028781634,
            "fullFormat": "Thu Feb 11 2021 14:33:01 GMT+0700 (WIT)",
            "year": 2021,
            "month": 1,
            "date": 11,
            "day": 1
          }
        ],
        "isPassed": false,
        "rating": 3,
        "lastUpdated": 1612928781634,
        "timestamp": 1612928781634,
        "id": "511206849146c42125000001"
      }
    }));
  }
});

http.createServer(app).listen(app.get('port'), function () {
  console.log('Express server listening on port ' + app.get('port'));
});
