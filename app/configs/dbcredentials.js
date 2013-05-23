/**
 * MongoDB connection information and crendentials
 */


// default configs
var config = {
  hostname: 'localhost',
  port: 27017,
  username: '',
  password: '',
  name: '',
  db: 'ghanozjson'
};

switch (process.env.NODE_ENV) {
  case 'production':
    if (process.env.VCAP_SERVICES) {
      var env = JSON.parse(process.env.VCAP_SERVICES);
      config = env['mongodb-1.8'][0]['credentials'];
    }

    break;

  case 'development':
    config.db = 'ghanozjson';
    break;

  case 'testing':
    config.db = 'ghanozjson_test';
    break;
}

module.exports = config;