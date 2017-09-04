# write-file-bluebird
[![NPM version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url] [![Coverage Status][coveralls-image]][coveralls-url] [![NSP Status][nsp-image]][nsp-url]

promise wrapper for node’s fs.writeFile().

wraps node’s [`fs.writeFile()`][fs-write-file], in a [bluebird][bluebird] promise that resolves with `true` if successful, or rejects with the `Error` returned by `fs.writeFile()`; both results need to be handled by the code calling this function.

## table of contents
* [installation](#installation)
* [usage](#usage)
    * [writeFile( file, data[, options] )](#writefile-file-data-options-)
    * [default](#default)
    * [using node’s path module](#using-nodes-path-module)
* [license](#license)

## installation
```javascript
npm install write-file-bluebird
```

## usage
### writeFile( file, data[, options] )
```javascript
 @param {string|buffer|number} file filename or file descriptor
 @param {string|buffer} data
 @param {object|string} [options]
 @param {string|null} [options.encoding = 'utf-8']
 @param {number} [options.mode = 0o666]
 @param {string} [options.flag = 'w']
 
 @returns {Promise}
```

### default
```javascript
var data = JSON.stringify( { test: "content" } );
var writeFile = require( 'write-file-bluebird' );

writeFile( 'test.json', data )
  .then(
    function( result ) {
      // handle success
    }
  )
  .catch(
    function( err ) {
      // handle error
    }
  );
```

### using node’s path module
the path `__dirname/test` must exist in order to create the file `test.json` in it
```javascript
var path = require( 'path' );
var data = JSON.stringify( { test: "content" } );
var writeFile = require( 'write-file-bluebird' );
var file = path.join( __dirname, 'test', 'test.json' );

writeFile( file, data )
  .then(
    function( result ) {
      // handle success
    }
  )
  .catch(
    function( err ) {
      // handle error
    }
  );
```

## license
[MIT License][mit-license]

[bluebird]: https://www.npmjs.com/package/bluebird
[coveralls-image]: https://coveralls.io/repos/github/dan-nl/write-file-bluebird/badge.svg?branch=master
[coveralls-url]: https://coveralls.io/github/dan-nl/write-file-bluebird?branch=master
[fs-write-file]: https://nodejs.org/api/fs.html#fs_fs_writefile_file_data_options_callback
[mit-license]: https://raw.githubusercontent.com/dan-nl/write-file-bluebird/master/license.txt
[npm-image]: https://img.shields.io/npm/v/write-file-bluebird.svg
[npm-url]: https://www.npmjs.com/package/write-file-bluebird
[nsp-image]: https://nodesecurity.io/orgs/githubdan-nl/projects/ceae3416-448a-4ca3-b838-c0ec6ffcc718/badge
[nsp-url]: https://nodesecurity.io/orgs/githubdan-nl/projects/ceae3416-448a-4ca3-b838-c0ec6ffcc718
[travis-image]: https://travis-ci.org/dan-nl/write-file-bluebird.svg?branch=master
[travis-url]: https://travis-ci.org/dan-nl/write-file-bluebird
