/*!
 * request-info <https://github.com/doowb/request-info>
 *
 * Copyright (c) 2016, Brian Woodward.
 * Licensed under the MIT License.
 */

'use strict';

var utils = require('./utils');

/**
 * Get information information about the given http request.
 * Some of the adapted from https://github.com/joola/joola.io.express/blob/master/index.js#L39-L50
 *
 * ```js
 * ```
 * @param  {Object} `req` http request object (from http or express)
 * @return {Object} info object containing `httpVersion`, `ip`, `method`, `referer`, `url`, and `ua` (useragent information)
 * @api public
 */

module.exports = function info(req) {
  return {
    httpVersion: req.httpVersionMajor + '.' + req.httpVersionMinor,
    ip: utils.ip(req, '127.0.0.1'),
    method: req.method,
    referer: utils.header(req, 'referer', '<undefined>'),
    url: req.url || '<undefined>',
    ua: utils.ua(req),
  };
};

