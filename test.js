/*!
 * request-info <https://github.com/doowb/request-info>
 *
 * Copyright (c) 2016, Brian Woodward.
 * Licensed under the MIT License.
 */

'use strict';

require('mocha');
var request = require('supertest');
var express = require('express');
var assert = require('assert');
var requestInfo = require('./');
var app;

describe('request-info', function() {
  beforeEach(function() {
    app = express();
  });

  it('should return request information', function(cb) {
    app.get('/', function(req, res, next) {
      var info = requestInfo(req);
      res.status(200)
        .json(info);
    });

    request(app)
      .get('/')
      .set('user-agent', 'Mozilla/5.0 (iPad; U; CPU OS 3_2_1 like Mac OS X; en-us) AppleWebKit/531.21.10 (KHTML, like Gecko) Mobile/7B405')
      .end(cb);
  });
});
