# round-geo-position [![Build Status](https://travis-ci.org/treble-snake/round-geo-position.svg?branch=master)](https://travis-ci.org/treble-snake/round-geo-position)

This lib rounds given geographical coordinates up to given precision distance.

E.g., up to 10 meters or 1 kilometer, or whatever you need.

It respects the fact, that circles of latitude have different length around the Earth.

## Installation
```
npm install --save round-geo-position
```

## Usage
```js
var round = require('round-geo-position');
// round geo coordinates up to 1 km
var roundedPosition = round(10.1234567, 20.1234567, 1000);
//=> {latitude: 10.123, longitude: 20.123}
```

**Function arguments**
* **latitude**, number  - \[-90; 90\]
* **longitude**, number - \[-180; 180\]
* **precision**, number > 0 - precision value in meters (by default) or yards
* **useYards**, boolean - if true, precision is considered given in yards
