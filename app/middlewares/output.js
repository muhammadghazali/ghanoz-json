/**
 * A middleware to generate resource representation based on the requested
 * content type.
 */

var easyxml = require('easyxml');

function resourceBuilder(res, code, resource) {
      res.format({
        'application/json': function () {
          res.json(code, resource);
        },
        'application/xml': function () {
          res.send(code, easyxml.render(resource));
        }
      });
    }

module.exports.output = function () {

  return function (req, res, next) {
    req.output = resourceBuilder;
    next();
  };
};