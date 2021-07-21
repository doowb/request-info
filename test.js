/*!
 * request-info <https://github.com/doowb/request-info>
 *
 * Copyright (c) 2016-present, Brian Woodward.
 * Licensed under the MIT License.
 */

'use strict';

const supertest = require('supertest');
const express = require('express');
const info = require('./');

describe('supertest-info', cb => {
  it('should parse Mozilla/5.0 iPad user-agent', cb => {
    const app = express();

    app.get('/', (req, res) => {
      res.status(200).json(info(req));
    });

    supertest(app)
      .get('/')
      .set('user-agent', 'Mozilla/5.0 (iPad; U; CPU OS 3_2_1 like Mac OS X; en-us) AppleWebKit/531.21.10 (KHTML, like Gecko) Mobile/7B405')
      .end(cb);
  });
});
