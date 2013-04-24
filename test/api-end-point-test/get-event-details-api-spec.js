/**
 * Get Event Details in JSON test suite
 */

var
  vows = require('vows'),
  assert = require('assert'),
  request = require('request'),
  Parser = require('xml2js').Parser;

var parser = new Parser({explicitArray: false});
var parseString = parser.parseString;

require('./start-app');

  /**
   * Scenario 1: Event Details request should return response in JSON
   * Given Event Details resource is accessible
   * And Event Details resource is accessible
   * When the client request the Event Details in JSON
   * Then the Web API should return Event Details in JSON
   * And returned response is supplied with the Event Details resource URL
   */
  vows.describe('Scenario 1: Event Details request should return response in JSON')
  .addBatch({
  'When the client request the Event Details in JSON': {
    topic: function () {
      request({
        uri: 'http://localhost:3000/event/1',
        headers: {
          'Accept': 'application/json'
        },
        method: 'GET'
      }, this.callback);
    },
    'the Web API should return Event Details in JSON':
      function (err, res, body) {
        assert.isNull(err);
        assert.equal(res.headers['content-type'], 'application/json');
        assert.isString(body);
        var result = JSON.parse(body);
        assert.isObject(result);
        assert.include(result, 'data');
      },
    'returned response is supplied with the Event Details resource URL':
      function (err, res, body) {
        assert.isNull(err);
        assert.isString(body);
        var result = JSON.parse(body);
        assert.isObject(result);
        assert.include(result, 'url');
      }
  }
})
  .export(module);

/**
 * Scenario 2: Event Details request should return response in XML
 * Given Event Details resource is accessible
 * And Event Details resource is accessible
 * When the client request the Event Details in XML
 * Then the Web API should return Event Details in XML
 * And returned response is supplied with the Event Details resource URL
 */

vows.describe('Scenario 2: Event Details request should return response in XML')
  .addBatch({
  'When the client request the Event Details in XML': {
    topic: function () {
      request({
        uri: 'http://localhost:3000/event/1',
        headers: {
          'Accept': 'application/xml'
        },
        method: 'GET'
      }, this.callback);
    },
    'the Web API should return Event Details in XML':
      function (err, res, body) {
        assert.isNull(err);
        assert.isString(body);
      }
  },
  'And returned response is supplied with the Event Details resource URL': {
    topic: function () {
      request({
        uri: 'http://localhost:3000/event/1',
        headers: {
          'Accept': 'application/xml'
        },
        method: 'GET'
      }, this.callback);
    },
    'now parse the xml content': {
      topic: function (res, body) {
        parseString(body, this.callback);
      },
      'should contained resource URL': function (err, result) {
        assert.isNull(err);
        assert.include(result.response, 'url');
        assert.include(result.response, 'data');
      }
    }
  }
})
  .export(module);

/**
 * Scenario 3: Unsupported Content-Type should return HTTP 406 code
 * Given the Web API only support JSON and XML for the response
 * When the client request the resource with Content-Type other than JSON or XML
 * Then the Web API should return HTTP 406 code
 * And returned reponse should be contained an client error message
 */
vows.describe('Scenario 3: Unsupported Content-Type should return HTTP 406 code')
  .addBatch({
  'When the client request the resource with Content-Type other than JSON or XML': {
    topic: function () {
      request({
        uri: 'http://localhost:3000/event/1',
        headers: {
          'Accept': 'application/xxx'
        },
        method: 'GET'
      }, this.callback);
    },
    'the Web API should return HTTP 406 code': function (err, res, body) {
      assert.isNull(err);
      assert.equal(res.statusCode, 406);
      assert.isString(body);
      assert.equal(body, 'Sorry, we only provide resources in JSON and XML.');
    }
  }
})
  .export(module);