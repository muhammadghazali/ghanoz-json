/**
 * A middleware to expose the MongoDB connection
 */
var MongoClient = require('mongodb').MongoClient;

var mongoUtils = require('./../utils/db/mongo');

var openedDb = null;

/**
 * Connect to MongoDB
 */
function connect (cb) {
  MongoClient.connect(mongoUtils.mongoURL, {
    auto_reconnect: true,
    poolSize: 5
  }, function (err, db) {
    if (err)
      cb(err);
    else if (db)
      cb(null, db);
  });
}

// expose the middleware
module.exports.mongoConnection = function () {

  return function (req, res, next) {
    if (openedDb === null) {
      connect(function (err, db) {
        if (err)
          res.send(500, 'Sorry, internal Error, please try again later');
        else {
          openedDb = db;
          req.mongodb = db;
          next();
        }
      });
    } else {
      req.mongodb = openedDb;
      next();
    }
  };
};