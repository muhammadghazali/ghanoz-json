/**
 * A middleware to check the requested content type.
 */
module.exports.acceptedContentType = function () {

  return function (req, res, next) {

    res.format({
      'application/xml': function () {
        next();
      },
      'application/json': function () {
        next();
      },
      'default': function () {
        res.send(406, 'Sorry, we only provide resources in JSON and XML.');
      }
    });
  };
};