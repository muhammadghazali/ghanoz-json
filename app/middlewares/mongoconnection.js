/**
 * A middleware to expose the MongoDB connection
 */
var MongoClient = require('mongodb').MongoClient;

var mongoUtils = require('./../utils/db/mongo');

module.exports.mongoConnection = function () {
  return function (req, res, next) {

    MongoClient.connect(mongoUtils.mongoURL, function (err, db) {
      if (err) {
        res.send(500, err);
      } else if (db) {
        req.mongodb = db;
        next();
      }
    });
  };
};