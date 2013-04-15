/**
 * API base path test suite
 */

var frisby = require('frisby');

var app = require('./../../src/app/app');

frisby.create('Get Brightbit Twitter feed')
  .get('http://localhost:3000')
  .expectStatus(200)
  .toss();