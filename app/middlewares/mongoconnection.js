/**
 * A middleware to expose the MongoDB connection
 */
var MongoClient = require('mongodb').MongoClient;

var mongoUtils = require('./../utils/db/mongo');

var openedDb = null;

/**
 * Connect to MongoDB
 *
 * @param {Function} cb callback function
 */
function connect (cb) {
  MongoClient.connect(mongoUtils.mongoURL, {
    auto_reconnect: true,
    poolSize: 100
  }, function (err, db) {
    if (err)
      cb(err);
    else if (db)
      cb(null, db);
  });
}

/**
 * Get MongoDB connection
 *
 * @param {Object} req HTTP request object
 * @param {Object} res HTTP response object
 * @param {Function} next callback function
 */
function getDbConnection (req, res, next) {

  connect(function (err, db) {
    if (err)
      res.send(500, 'Sorry, internal Error, please try again later');
    else {
      openedDb = db;
      req.mongodb = db;
      next();
    }
  });
}

/**
 * Attach MongoDB connection
 *
 * @param {Object} req HTTP request object
 * @param {Function} next callback function
 */
function passDbConnection (req, next) {
  req.mongodb = openedDb;
  next();
}

// expose the middleware
module.exports.mongoConnection = function () {

  return function (req, res, next) {
    if (openedDb === null) {
      getDbConnection(req, res, next);
    } else {
      passDbConnection(req, next);
    }
  };
};