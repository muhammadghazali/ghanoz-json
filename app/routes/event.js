/**
 * Event routes handler
 */

var easyXML = require('easyxml');

var
  event = {},
  EVENT_COLLECTION = 'events';

/**
 * Get collection
 *
 * @param {Object} db available database connection
 */
function selectCollection (db) {

  event = db.collection(EVENT_COLLECTION);
}

// get API base path based on the running mode
function getBasePath () {

  return (process.env.NODE_ENV === 'production') ?
    'http://ghanozjson.ap01.aws.af.cm' : 'http://localhost:3000';
}

exports.details = function (req, res) {

  var eventID = parseInt(req.params.id, 10);

  selectCollection(req.mongodb);
  event.findOne({_id: eventID}, function (err, doc) {
    if (err) {
      req.output(res, 500, {error: err.toString()});
    } else if (doc === null) {
      req.output(res, 404, {message: 'Requested resource could not be found'});
    } else if (doc) {
      var responseData = {
        url: getBasePath() + '/event' + eventID,
        data: doc
      };

      req.output(res, 200, responseData);
    }
  });
};

exports.list = function (req, res) {

  selectCollection(req.mongodb);
  event.find({}, {limit: 15}).toArray(function (err, docs) {
    if (err) {
      req.output(res, 500, {message: err.toString()});
    } else if (docs.length === 0) {
      req.output(res, 404, {message: 'Requested resource could not be found'});
    } else if (docs.length > 0) {
      var responseData = {
        url: getBasePath() + '/events',
        data: docs
      };

      req.output(res, 200, responseData);
    }
  });
};