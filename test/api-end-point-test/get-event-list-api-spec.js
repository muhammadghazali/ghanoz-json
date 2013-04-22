/**
 * Get Event List in JSON API test suite
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
 * Scenario 1: Event List request should return response in JSON
 * Given Event List resource is accessible
 * And Event List resource is accessible
 * When the client request the Event List in JSON
 * Then the Web API should return Event List in JSON
 * And returned response is should be accompanied by properties like resource url, page, pages, pageSize, total
 * And the maximum of number of item on the Event List is 15 Event
 */
vows.describe('Scenario 1: Event List request should return response in JSON')
  .addBatch({
  'When the client request the Event List in JSON': {
    topic: function () {
      request({
        uri: 'http://localhost:3000/events',
        headers: {
          'Accept': 'application/json'
        },
        method: 'GET'
      }, this.callback);
    },
    'the Web API should return Event List in JSON':
      function (err, res, body) {
        assert.isNull(err);
        assert.equal(res.headers['content-type'], 'application/json');
        assert.isString(body);
        var result = JSON.parse(body);
        assert.isObject(result);
        var expectedFields = ['url', 'page', 'pageSize', 'total', 'data'];
        for (var i = 0; i < result.data.length; i++) {
          var doc = result.data[1];

          for (var j = 0; j < expectedFields.length; j++)
            assert.include(doc, expectedFields[i]);
        }
      },
    'returned response is supplied with the Event List resource URL':
      function (err, res, body) {
        assert.isNull(err);
        assert.isString(body);
        var result = JSON.parse(body);
        assert.isObject(result);

        var data = result.data;
        for (var key in data)
          assert.include(data, key);
      }
  }
})
  .export(module);

/**
 * Scenario 2: Event List request should return response in XML
 * Given Event List resource is accessible
 * And Event List resource is accessible
 * When the client request the Event List in XML
 * Then the Web API should return Event List in XML
 * And returned response is should be accompanied by properties like resource url, page, pages, pageSize, total
 * And the maximum of number of item on the Event List is 15 Event
 */
vows.describe('Scenario 2: Event List request should return response in XML')
  .addBatch({
  'When the client request the Event List in XML': {
    topic: function () {
      request({
        uri: 'http://localhost:3000/events',
        headers: {
          'Accept': 'application/xml'
        },
        method: 'GET'
      }, this.callback);
    },
    'the Web API should return Event List in XML':
      function (err, res, body) {
        assert.isNull(err);
        assert.isString(body);
      }
  },
  'And returned response is supplied with the Event List resource URL': {
    topic: function () {
      request({
        uri: 'http://localhost:3000/events',
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
        assert.isObject(result);

        var expectedFields = ['url', 'page', 'pageSize', 'total', 'data'];
        for (var i = 0; i < result.data.length; i++) {
          var doc = result.data[1];

          for (var j = 0; j < expectedFields.length; j++)
            assert.include(doc, expectedFields[i]);
        }
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
        uri: 'http://localhost:3000/events',
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