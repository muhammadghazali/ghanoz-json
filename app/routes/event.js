/**
 * Event routes handler
 */

var easyXML = require('easyxml');
exports.details = function (req, res) {

  var eventID = parseInt(req.params.id, 10);
  var collection = req.mongodb.collection('events');
  collection.findOne({_id: eventID}, function (err, doc) {
    if (err) {
      req.output(res, 500, {error: err.toString()});
    } else if (doc === null) {
      req.output(res, 404, {message: 'Requested resource could not be found'});
    } else if (doc) {
      var responseData = {
        url: "http://localhost:3000/event" + eventID,
        data: doc
      };

      req.output(res, 200, responseData);
    }
  });
};