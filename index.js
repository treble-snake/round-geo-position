/*!
 * round-geo-position <https://github.com/treble-snake/round-geo-position>
 *
 * Copyright (c) 2018 Treble Snake.
 * Released under the MIT License.
 */

'use strict';

var LATITUDE_DEGREE_LENGTH = 111133; // meters, 20,003.93 / 180
var EQUATOR_LONGITUDE_DEGREE_LENGTH = 111319; // meters 40075 / 360
var YARDS_IN_METER = 0.9144;

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

  if (precision <= 0) {
    throw new RangeError(['Wrong precision value: ', precision].join());
  }
}

function yardsToMeters(yards) {
  return yards *  YARDS_IN_METER;
}

/**
 * @param {number} latitude
 * @param {number} longitude
 * @param {number} precision - precision in meters by default,
 * in yards if useYards is set to true
 * @param {boolean} [useYards=false] - if true, precision is considered given in yards
 * @return {{latitude: number, longitude: number}}
 * @throws {RangeError}
 */
function roundCoordinates(latitude, longitude, precision, useYards) {
  var lngLength = getLongitudeDegreeLength(latitude);
  if(useYards) {
    precision = yardsToMeters(precision);
  }

  validate(latitude, longitude, lngLength, precision);

  var latPrecision =
    precision > LATITUDE_DEGREE_LENGTH ? 1 : precision / LATITUDE_DEGREE_LENGTH;
  var lngPrecision = precision > lngLength ? 1 : precision / lngLength;

  var latRate = Math.pow(10, getPow(latPrecision));
  var lngRate = Math.pow(10, getPow(lngPrecision));

  return {
    latitude: round(latitude, latRate),
    longitude: round(longitude, lngRate)
  };
}

module.exports = roundCoordinates;