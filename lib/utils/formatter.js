(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['module', 'exports', 'lodash/map', 'lodash/isString', 'lodash/isUndefined', 'lodash/isDate', 'lodash/has', 'lodash/includes', 'lodash/partial', 'moment-strftime'], factory);
  } else if (typeof exports !== "undefined") {
    factory(module, exports, require('lodash/map'), require('lodash/isString'), require('lodash/isUndefined'), require('lodash/isDate'), require('lodash/has'), require('lodash/includes'), require('lodash/partial'), require('moment-strftime'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod, mod.exports, global.map, global.isString, global.isUndefined, global.isDate, global.has, global.includes, global.partial, global.momentStrftime);
    global.formatter = mod.exports;
  }
})(this, function (module, exports, _map2, _isString2, _isUndefined2, _isDate2, _has2, _includes2, _partial2, _momentStrftime) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  exports.default = function (item) {
    var value = getValue(item);

    return function (col) {
      return (0, _has3.default)(col, 'concat') ? concatValues(value, col) : value(col.key);
    };
  };

  var _map3 = _interopRequireDefault(_map2);

  var _isString3 = _interopRequireDefault(_isString2);

  var _isUndefined3 = _interopRequireDefault(_isUndefined2);

  var _isDate3 = _interopRequireDefault(_isDate2);

  var _has3 = _interopRequireDefault(_has2);

  var _includes3 = _interopRequireDefault(_includes2);

  var _partial3 = _interopRequireDefault(_partial2);

  var _momentStrftime2 = _interopRequireDefault(_momentStrftime);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  _partial = _partial3.default;

  _includes = _includes3.default;

  function getFormat(col) {
    if ((0, _has3.default)(col, 'fmt')) return col.fmt;

    if ((0, _has3.default)(col, 'type') && col.type === 'dateTime') {
      return '%d/%m/%Y %H:%M';
    }

    return '%d/%m/%Y';
  }

  function displayData(data, col) {
    if (!(0, _isDate3.default)(data)) return data;
    return (0, _momentStrftime2.default)(data).strftime(getFormat(col));
  }

  function getValue(item) {
    var data = item;
    return function (keys) {
      if ((0, _isUndefined3.default)(keys)) return null;
      if ((0, _isString3.default)(keys)) return data.get(keys);
      var values = keys.map(function (key) {
        return data.get(key);
      });

      return values;
    };
  }

  function concatValues(item, col) {
    var concat = item([col.key, col.concat]);
    var val = (0, _map3.default)(concat, function (d) {
      var data = displayData(d, col);

      return data;
    });

    return val.join(' ' + col.split + ' ');
  }

  ;
  module.exports = exports['default'];
});