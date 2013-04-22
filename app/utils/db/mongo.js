/**
 * Generate mongo url based.
 */
function generateMongoURL() {

  credentials = require('./../../configs/dbcredentials');

  credentials.hostname = (credentials.hostname ||
    'localhost');
  credentials.port = (credentials.port || 27017);
  credentials.db = (credentials.db || 'test');

  if (credentials.username && credentials.password) {
    return 'mongodb://' +
      credentials.username + ':' +
      credentials.password + '@' +
      credentials.hostname + ':' +
      credentials.port + '/' +
      credentials.db;
  } else {
    return 'mongodb://' +
      credentials.hostname + ':' +
      credentials.port + '/' +
      credentials.db;
  }
};

exports.mongoURL = generateMongoURL();