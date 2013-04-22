/**
 * A middleware to check the requested content type.
 */
module.exports.acceptedFormat = function () {

  return function (req, res, next) {

    res.format({
      'application/json': function () {
        next();
      },
      'application/xml': function () {
        next();
      },
      'default': function () {
        res.send(406, 'Sorry, we only provide resources in JSON and XML.');
      }
    });
  };
};