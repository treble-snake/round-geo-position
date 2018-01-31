# round-geo-position [![Build Status](https://travis-ci.org/treble-snake/round-geo-position.svg?branch=master)](https://travis-ci.org/treble-snake/round-geo-position)

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
* **latitude** - \[-90; 90\]
* **longitude** - \[-180; 180\]
* **precision** - precision value in meters
