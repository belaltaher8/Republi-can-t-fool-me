/* globals describe, after, it */
'use strict';

/**
 * module dependencies
 */
var Promise = require( 'bluebird' );
var chai = require( 'chai' );
var chaiAsPromised = require( 'chai-as-promised' );
var expect = chai.expect;
var fs = require( 'fs' );
var writeFile = require( '../src' );

/**
 * module variables
 */
var file = 'test.json';
var data = JSON.stringify( { test: 'content' } );

/**
 * module plugins
 */
chai.use( chaiAsPromised );

describe( 'writeFile( file, data[, options] )', function () {
  describe( 'should return', function () {
    after(
      function () {
        fs.unlink( file );
      }
    );

    it( 'a bluebird promise', function () {
      return expect( writeFile( file, data ) ).to.be.instanceof( Promise );
    } );
  } );

  describe( 'should resolve', function () {
    after(
      function () {
        fs.unlink( file );
      }
    );

    it( 'with `true` when the file is created successfully', function () {
      return expect( writeFile( file, data ) ).to.eventually.equal( true );
    } );
  } );

  describe( 'should reject with', function () {
    it( 'a `TypeError` when `file` is not a string', function () {
      return expect( writeFile() ).to.be.rejectedWith( TypeError, 'path must be a string' );
    } );

    it( 'an `Error` when attempting to write a file to an existing named resource that is a directory, e.g. file = node_modules', function () {
      return expect( writeFile( 'node_modules', data ) ).to.be.rejectedWith( Error, 'EISDIR' );
    } );
  } );
} );
