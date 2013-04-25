/**
 * Main site routes handler
 */

exports.index = function (req, res) {
  var responseData = {
    url: 'http://ghanozjson.ap01.aws.af.cm/',
    data: {message: 'ghanozjson Web API!'}
  };

  req.output(res, 200, responseData);
};