/**
 * API base path test suite
 */

var frisby = require('frisby');

var app = require('./../../src/app/app');

frisby.create('Test API base path')
  .get('http://localhost:3000')
  .expectStatus(200)
  .toss();