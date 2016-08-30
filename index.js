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
 *
 * ```js
 * console.log(info(req));
 * //=> {
 * //=>   httpVersion: '1.1',
 * //=>   ip: '127.0.0.1',
 * //=>   method: 'GET',
 * //=>   referer: 'http://localhost:8080/index.html',
 * //=>   url: '/',
 * //=>   ua: {
 * //=>     ua: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_9_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/52.0.2743.116 Safari/537.36',
 * //=>     browser: { name: 'Chrome', version: '52.0.2743.116', major: '52' },
 * //=>     engine: { version: '537.36', name: 'WebKit' },
 * //=>     os: { name: 'Mac OS', version: '10.9.5' },
 * //=>     device: { model: undefined, vendor: undefined, type: undefined },
 * //=>     cpu: { architecture: undefined }
 * //=>   }
 * //=> }
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

