/**
 * A middleware to generate resource representation based on the requested
 * content type.
 */

var
  easyxml = require('easyxml'),
  prettyData = require('pretty-data').pd;

/**
 * @param {Object} res HTTP response object
 * @param {Number} code HTTP status code
 * @param {Object} resource resource to be build
 */
function resourceBuilder (res, code, resource) {
  res.format({
    'application/json': function () {
      res.json(code, resource);
    },
    'application/xml': function () {
      var minifiedResponse = (process.env.NODE_ENV === 'production') ?
        prettyData.xmlmin(easyxml.render(resource)) : easyxml.render(resource);

      res.send(code, minifiedResponse);
    }
  });
}

// Write the resource and attach it to HTTP request object
module.exports.writeResource = function () {

  return function (req, res, next) {
    req.output = resourceBuilder;
    next();
  };
};