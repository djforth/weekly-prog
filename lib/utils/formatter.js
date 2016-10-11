'use strict';

var moment = require('moment-strftime'),
    _ = require('lodash/core');

_.partial = require('lodash/partial');
_.includes = require('lodash/includes');

function getFormat(col) {
  if (_.has(col, 'fmt')) return col.fmt;

  if (_.has(col, 'type') && col.type === 'dateTime') {
    return '%d/%m/%Y %H:%M';
  }

  return '%d/%m/%Y';
}

function displayData(data, col) {
  if (!_.isDate(data)) return data;
  return moment(data).strftime(getFormat(col));
}

function getValue(item) {
  var data = item;
  return function (keys) {
    if (_.isString(keys)) return data.get(keys);

    var values = keys.map(function (key) {
      return data.get(key);
    });

    return values;
  };
}

function concatValues(item, col) {
  var concat = item([col.key, col.concat]);
  var val = _.map(concat, function (d) {
    var data = displayData(d, col);

    return data;
  });

  return val.join(' ' + col.split + ' ');
}

module.exports = function (item) {
  var value = getValue(item);

  return function (col) {
    return _.has(col, 'concat') ? concatValues(value, col) : value(col.key);
  };
};
;

var _temp = function () {
  if (typeof __REACT_HOT_LOADER__ === 'undefined') {
    return;
  }

  __REACT_HOT_LOADER__.register(getFormat, 'getFormat', 'src/utils/formatter.js');

  __REACT_HOT_LOADER__.register(displayData, 'displayData', 'src/utils/formatter.js');

  __REACT_HOT_LOADER__.register(getValue, 'getValue', 'src/utils/formatter.js');

  __REACT_HOT_LOADER__.register(concatValues, 'concatValues', 'src/utils/formatter.js');
}();

;