'use strict';

/**
 * module dependencies
 */
var fs = require( 'fs' );
var Promise = require( 'bluebird' );

/**
 * promise wrapper for node’s fs.writeFile().
 *
 * wraps node’s fs.writeFile(), in a bluebird promise that resolves with `true` if
 * successful or rejects with the `Error` returned by fs.writeFile(); both results need to be
 * handled by the code calling this module
 *
 * @param {string|buffer|number} file filename or file descriptor
 * @param {string|buffer} data
 * @param {object|string} [options]
 * @param {string|null} [options.encoding = 'utf-8']
 * @param {number} [options.mode = 0o666]
 * @param {string} [options.flag = 'w']
 *
 * @returns {Promise}
 */
module.exports = function writeFile( file, data, options ) {
  return new Promise(
    /**
     * @param {Function} resolve
     * @param {Function} reject
     */
    function ( resolve, reject ) {
      fs.writeFile(
        file,
        data,
        options,
        /**
         * @param {Error} [err]
         */
        function callback( err ) {
          if ( err ) {
            reject( err );
            return;
          }

          resolve( true );
        }
      );
    }
  );
};
