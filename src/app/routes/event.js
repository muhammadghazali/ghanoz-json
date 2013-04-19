/**
 * Event routes handler
 */

var easyXML = require('easyxml');

exports.details = function (req, res) {

  if (req.params.id && req.accepts('application/json')) {
    var collection = req.mongodb.collection('events');
    collection.findOne({_id: parseInt(req.params.id, 10)}, function (err, eventDoc) {
      if (err) {
        res.json(500, err.toString());
      } else if (eventDoc) {
        res.set('Content-Type', 'application/json');
        var responseData = {
          url: "http://localhost:3000/event" + req.params.id,
          data: eventDoc
        };
        res.json(responseData);
      } else if (eventDoc === null) {
        res.set('Content-Type', 'application/json');
        res.json(404, {message: "Not Found"});
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
};