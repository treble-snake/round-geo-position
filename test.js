require('mocha');
var assert = require('assert');
var round = require('./');

var TEST_VALUE = 10.123456789123;

describe('Exists', function () {
  it('should export a function', function () {
    assert.equal(typeof round, 'function');
  });
});

describe('Validation', function () {
  it('should throw on wrong latitude', function () {
    assert.throws(function () {
      round(91, 0, 1000);
    }, RangeError);
    assert.throws(function () {
      round(-91, 0, 1000);
    }, RangeError);
  });

  it('should throw on wrong longitude', function () {
    assert.throws(function () {
      round(0, 181, 1000);
    }, RangeError);
    assert.throws(function () {
      round(0, -181, 1000);
    }, RangeError);
  });

  it('should throw on wrong precision', function () {
    assert.throws(function () {
      round(0, 0, 0);
    }, RangeError);
    assert.throws(function () {
      round(0, 0, -100);
    }, RangeError);
  });

  it('should accept too large precision', function () {
    var value = round(TEST_VALUE, TEST_VALUE, Number.POSITIVE_INFINITY);
    assert.equal(value.latitude, 10);
    assert.equal(value.longitude, 10);
  });
});

describe('Calculations in meters', function () {
  it('should round to 1cm', function () {
    var value = round(TEST_VALUE, TEST_VALUE, 0.01);
    assert.equal(value.latitude, 10.12345679);
    assert.equal(value.longitude, 10.12345679);
  });

  it('should round to 1m', function () {
    var value = round(TEST_VALUE, TEST_VALUE, 1);
    assert.equal(value.latitude, 10.123457);
    assert.equal(value.longitude, 10.123457);
  });

  it('should round to 100m', function () {
    var value = round(TEST_VALUE, TEST_VALUE, 100);
    assert.equal(value.latitude, 10.1235);
    assert.equal(value.longitude, 10.1235);
  });

  it('should round to 1km', function () {
    var value = round(TEST_VALUE, TEST_VALUE, 1000);
    assert.equal(value.latitude, 10.123);
    assert.equal(value.longitude, 10.123);
  });

  it('should round to 100km', function () {
    var value = round(TEST_VALUE, TEST_VALUE, 100000);
    assert.equal(value.latitude, 10.1);
    assert.equal(value.longitude, 10.1);
  });

  it('should round with different precision', function () {
    var value = round(89.123456789123, TEST_VALUE, 1000);
    assert.equal(value.latitude, 89.123);
    assert.equal(value.longitude, 10.1);
  });

  it('should work on south pole', function () {
    var value = round(90, TEST_VALUE, 1000);
    assert.equal(value.latitude, 90);
    assert.equal(value.longitude, 10);
  });

  it('should work on north pole', function () {
    var value = round(-90, TEST_VALUE, 1000);
    assert.equal(value.latitude, -90);
    assert.equal(value.longitude, 10);
  });

  it('should not modify coordinates', function () {
    var value = round(12.12, 15.15, 1);
    assert.equal(value.latitude, 12.12);
    assert.equal(value.longitude, 15.15);
  });
});

describe('Calculations in yards', function () {
  it('should round to 1 yd', function () {
    var value = round(TEST_VALUE, TEST_VALUE, 1, true);
    assert.equal(value.latitude, 10.123457);
    assert.equal(value.longitude, 10.123457);
  });

  it('should round to 1000 yd', function () {
    var value = round(TEST_VALUE, TEST_VALUE, 1000, true);
    assert.equal(value.latitude, 10.123);
    assert.equal(value.longitude, 10.123);
  });

  it('should not modify coordinates', function () {
    var value = round(12.12, 15.15, 1, true);
    assert.equal(value.latitude, 12.12);
    assert.equal(value.longitude, 15.15);
  });
});