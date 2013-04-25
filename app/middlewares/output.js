/**
 * A middleware to generate resource representation based on the requested
 * content type.
 */

var
  easyxml = require('easyxml'),
  pd = require('pretty-data').pd;

function resourceBuilder (res, code, resource) {
  res.format({
    'application/json': function () {
      res.json(code, resource);
    },
    'application/xml': function () {
      var minifiedResponse = (process.env.NODE_ENV === 'production') ?
        pd.xmlmin(easyxml.render(resource)) : easyxml.render(resource);
        
      res.send(code, minifiedResponse);
    }
  });
}

module.exports.output = function () {

  return function (req, res, next) {
    req.output = resourceBuilder;
    next();
  };
};