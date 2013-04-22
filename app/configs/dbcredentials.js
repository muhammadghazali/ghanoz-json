/**
 * MongoDB connection information and crendentials
 */

var config = {};

switch (process.env.NODE_ENV) {
  case 'production':
    var env = JSON.parse(process.env.VCAP_SERVICES);

    config = env['mongodb-1.8'][0]['credentials'];
    break;

  case 'development':
    config = {
      hostname: 'localhost',
      port: 27017,
      username: '',
      password: '',
      name: '',
      db: 'ghanozjson'
    };
    break;

  case 'testing':
    config = {
      hostname: 'localhost',
      port: 27017,
      username: '',
      password: '',
      name: '',
      db: 'ghanozjson_test'
    };
    break;
}

module.exports = config;