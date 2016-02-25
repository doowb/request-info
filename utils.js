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
  ua.setUA(req.header('user-agent'));
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
 * Expose `utils` modules
 */

module.exports = utils;
