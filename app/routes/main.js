/**
 * Main site routes handler
 */

exports.index = function (req, res) {
  res.format({
    'application/json': function () {
      res.send({message: 'ghanozjson Web API!'});
    },
    'default': function () {
      res.send({message: 'ghanozjson Web API!'});
    }
  });
};