/*!
 * request-info <https://github.com/doowb/request-info>
 *
 * Copyright (c) 2016, Brian Woodward.
 * Licensed under the MIT License.
 */

'use strict';

/**
 * Module dependencies
 */

var utils = require('lazy-cache')(require);

/**
 * Temporarily re-assign `require` to trick browserify and
 * webpack into reconizing lazy dependencies.
 *
 * This tiny bit of ugliness has the huge dual advantage of
 * only loading modules that are actually called at some
 * point in the lifecycle of the application, whilst also
 * allowing browserify and webpack to find modules that
 * are depended on but never actually called.
 */

var fn = require;
require = utils;

/**
 * Lazily required module dependencies
 */

require('ua-parser-js', 'uaParser');

/**
 * Restore `require`
 */

require = fn;

/**
 * Extract the useragent information
 * and return as an object.
 *
 * @param  {Object} `req` http request object (from http or express)
 * @return {Object} useragent information parsed from `user-agent` header
 */

utils.ua = function(req) {
  var ua = new utils.uaParser();
  ua.setUA(utils.header(req, 'user-agent'));
  return ua.getResult();
};

/**
 * Get the ip address from the request object
 *
 * @param  {Object} `req` http request object (from http or express)
 * @param  {String} `def` default ip address if one isn't found
 * @return {String} ip address
 */

utils.ip = function(req, def) {
  return req.ip ||
    (req.connection && req.connection.remoteAddress) ||
    (req.socket && req.socket.remoteAddress) ||
    (req.socket && req.socket.socket && req.socket.socket.remoteAddresss) ||
    def;
};

/**
 * Get the header from either the `header` function on `req` or from the `headers` array.
 *
 * ```js
 * var referer = utils.header(req, 'referer', '<undefined>');
 * console.log(referer);
 * //=> 'http://localhost'
 * ```
 * @param  {Object} `req` Request object from http or [express]
 * @param  {String} `prop` Header property to get.
 * @param  {String} `def` Default to return if the property is not found.
 * @return {String} Specified header or default if the header is not found.
 */

utils.header = function(req, prop, def) {
  if (typeof req.header === 'function') {
    return req.header(prop) || def;
  }
  return req.headers[prop] || def;
};

/**
 * Expose `utils` modules
 */

module.exports = utils;
