
// external modules
var
  express = require('express'),
  http = require('http'),
  path = require('path');

// internal modules
var appConfigs = require('./configs/app');

var app = module.exports = express();

appConfigs.loadConfigs(app);

var routes = require('./routes');

app.get('/', routes.main.index);

app.get('/event/:id', routes.event.details);

app.get('/events', routes.event.list);

app.get('/loaderio-99080ddebf0052dfdbe912e4352c0ce8', function (req, res) {
  res.send('loaderio-99080ddebf0052dfdbe912e4352c0ce8');
});

app.listen(process.env.VCAP_APP_PORT || app.get('port'), function () {
  console.log('Express server listening on port ' + app.get('port'));
});