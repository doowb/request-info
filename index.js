/*!
 * request-info <https://github.com/doowb/request-info>
 *
 * Copyright (c) 2016-present, Brian Woodward.
 * Licensed under the MIT License.
 */

'use strict';

const UserAgentParser = require('ua-parser-js');

/**
 * Extract the useragent information
 * and return as an object.
 * @param  {Object} `req` http request object (from http or express)
 * @return {Object} useragent information parsed from `user-agent` header
 */

const parseUserAgent = req => {
  var ua = new UserAgentParser();
  ua.setUA(header(req, 'user-agent'));
  return ua.getResult();
};

/**
 * Get the ip address from the request object
 * @param  {Object} `req` http request object (from http or express)
 * @param  {String} `def` default ip address if one isn't found
 * @return {String} ip address
 */

const ip = (req, def) => {
  return req.ip
    || req.connection?.remoteAddress
    || req.socket?.remoteAddress
    || req.socket?.socket?.remoteAddresss
    || def;
};

/**
 * Get the header from either the `header` function on `req` or from the `headers` array.
 *
 * ```js
 * var referer = header(req, 'referer', '<undefined>');
 * console.log(referer);
 * //=> 'http://localhost'
 * ```
 * @param  {Object} `req` Request object from http or [express]
 * @param  {String} `prop` Header property to get.
 * @param  {String} `def` Default to return if the property is not found.
 * @return {String} Specified header or default if the header is not found.
 */

const header = (req, prop, def) => {
  if (typeof req.header === 'function') {
    return req.header(prop) || def;
  }
  return req.headers[prop] || def;
};

/**
 * Get information information about the given http request.
 *
 * ```js
 * const express = require('express');
 * const app = express();
 *
 * app.get('/', (req, res) => {
 *   console.log(info(req));
 *   // {
 *   //   httpVersion: '1.1',
 *   //   ip: '127.0.0.1',
 *   //   method: 'GET',
 *   //   referer: 'http://localhost:8080/index.html',
 *   //   url: '/',
 *   //   ua: {
 *   //     ua: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_9_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/52.0.2743.116 Safari/537.36',
 *   //     browser: { name: 'Chrome', version: '52.0.2743.116', major: '52' },
 *   //     engine: { version: '537.36', name: 'WebKit' },
 *   //     os: { name: 'Mac OS', version: '10.9.5' },
 *   //     device: { model: undefined, vendor: undefined, type: undefined },
 *   //     cpu: { architecture: undefined }
 *   //   }
 *   // }
 * });
 * ```
 * @param  {Object} `req` http request object (from http or express)
 * @return {Object} info object containing `httpVersion`, `ip`, `method`, `referer`, `url`, and `ua` (useragent information)
 * @api public
 */

module.exports = (req = {}) => {
  try {
    const { httpVersionMajor, httpVersionMinor, method, url = '<undefined>' } = req;
    const data = parseUserAgent(req);

    const info = {
      ...data,
      method,
      ip: ip(req, '127.0.0.1'),
      url,
      httpVersion: `${httpVersionMajor}.${httpVersionMinor}`,
      referer: header(req, 'referer', '<undefined>')
    };

    return info;
  } catch (err) {
    console.log(err);
  }
};

