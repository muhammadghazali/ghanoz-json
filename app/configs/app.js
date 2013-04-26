var express = require('express');

var middlewares = require('./../middlewares');

module.exports.loadConfigs = function (app) {

  // all environments
  app.set('port', process.env.PORT || 3000);
  app.use(express.favicon());
  app.use(express.logger());
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  // custom middlewares
  app.use(middlewares.acceptedFormat());
  app.use(middlewares.writeResource());
  app.use(middlewares.mongoConnection());
  app.use(app.router);

  // development only
  if ('development' == app.get('env')) {
    app.use(express.logger('dev'));
    app.use(express.errorHandler({dumpExceptions: true, showStack: true}));
  }

  // production only
  if ('production' == app.get('env')) {
    app.use(express.errorHandler({dumpExceptions: true}));
  }

  // testing only
  if ('testing' == app.get('env')) {
    app.use(express.logger('dev'));
    app.use(express.errorHandler({dumpExceptions: true, showStack: true}));
  }
};