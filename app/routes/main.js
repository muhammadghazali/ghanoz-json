/**
 * Main site routes handler
 */

exports.index = function (req, res) {
  req.output(res, 200, {message: 'ghanozjson Web API!'});
};