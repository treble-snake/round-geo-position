/*!
 * round-geo-position <https://github.com/treble-snake/round-geo-position>
 *
 * Copyright (c) 2018 Treble Snake.
 * Released under the MIT License.
 */

'use strict';

var LATITUDE_DEGREE_LENGTH = 111133; // meters, 20,003.93 / 180
var EQUATOR_LONGITUDE_DEGREE_LENGTH = 111319; // meters 40075 / 360

/**
 * Longitude length varies depending on current latitude
 * @param {number} latitude
 * @return {number} in meters
 */
function getLongitudeDegreeLength(latitude) {
  return EQUATOR_LONGITUDE_DEGREE_LENGTH * Math.cos(degreesToRadians(latitude));
}

/**
 * @param {number} degrees
 * @return {number} radians
 */
function degreesToRadians(degrees) {
  return degrees * Math.PI / 180;
}

/**
 * @param {number} value
 * @param {number} precision
 * @return {number}
 */
function round(value, precision) {
  return Math.round(value * precision) / precision;
}

/**
 * @param {number} x
 * @return {number}
 */
function getPow(x) {
  return Math.ceil(-1 * Math.log10(x));
}

/**
 * @param {number} lat
 * @param {number} lng
 * @param {number} lngLength
 * @param {number} precision
 * @throws {RangeError}
 */
function validate(lat, lng, lngLength, precision) {
  if (Math.abs(lat) > 90) {
    throw new RangeError(['Wrong latitude value: ', precision].join());
  }

  if (Math.abs(lng) > 180) {
    throw new RangeError(['Wrong longitude value: ', precision].join());
  }

  if (precision <= 0 || precision > LATITUDE_DEGREE_LENGTH || precision > lngLength) {
    throw new RangeError(['Wrong precision value: ', precision].join());
  }
}

/**
 * @param {number} latitude
 * @param {number} longitude
 * @param {number} precisionMeters
 * @return {{latitude: number, longitude: number}}
 * @throws {RangeError}
 */
function roundCoordinates(latitude, longitude, precisionMeters) {
  var lngLength = getLongitudeDegreeLength(latitude);
  validate(latitude, longitude, lngLength, precisionMeters);

  var latPrecision = precisionMeters / LATITUDE_DEGREE_LENGTH;
  var lngPrecision = precisionMeters / lngLength;

  var latRate = Math.pow(10, getPow(latPrecision));
  var lngRate = Math.pow(10, getPow(lngPrecision));

  return {
    latitude: round(latitude, latRate),
    longitude: round(longitude, lngRate)
  };
}

module.exports = roundCoordinates;
