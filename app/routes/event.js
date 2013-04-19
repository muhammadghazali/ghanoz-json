/**
 * Event routes handler
 */

var easyXML = require('easyxml');

exports.details = function (req, res) {

  if (!req.params.id) {
    res.type('application/json');
    res.json(400, {message: 'Request cannot be fulfilled due to bad syntax'});
  }

  var eventID = parseInt(req.params.id, 10);

  var collection = req.mongodb.collection('events');
  collection.findOne({_id: eventID}, function (err, doc) {
    if (err) {
      res.format({
        'application/json': function () {
          res.json(500, err.toString());
        },
        'application/xml': function () {
          // TODO it should be send an error in xml string
          res.send(500, err.toString());
        }
      });
    } else if (doc === null) {
      res.format({
        'application/json': function () {
          res.json(400, err.toString());
        },
        'application/xml': function () {
          // TODO it should be send an error in xml string
          res.send(400, err.toString());
        }
      });

    } else if (doc) {
      res.format({
        'application/json': function () {
          var jsonResData = {
            url: "http://localhost:3000/event" + eventID,
            data: doc
          };

          res.json(jsonResData);
        },
        'application/xml': function () {

          easyXML.configure({
            singularizeChildren: true,
            underscoreAttributes: true,
            rootElement: 'response',
            dateFormat: 'ISO',
            manifest: false,
            indent: 2
          });

          var xmlResData = easyXML.render({
            "url": "http://example.com/event/1",
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
          });

          res.send(200, xmlResData);
        }
      });
    }
  });
};