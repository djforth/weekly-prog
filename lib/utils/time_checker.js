'use strict';

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _ = require('lodash/core'),
    Moment = require('moment');

_.includes = require('lodash/includes');

function isnow(st, fn) {
  var now = Moment();
  return (now.isAfter(st) || now.isSame(st)) && (now.isBefore(fn) || now.isSame(fn));
}

function ispast(fn) {
  var now = Moment();
  return now.isAfter(fn);
}

module.exports = function (item, col) {
  var times = _.pick(col, ['key', 'concat']);

  var _$values = _.values(times);

  var _$values2 = _slicedToArray(_$values, 2);

  var stk = _$values2[0];
  var fnk = _$values2[1];
  var _ref = [item.get(stk), item.get(fnk)];
  var st = _ref[0];
  var fn = _ref[1];


  return {
    isNow: function isNow() {
      return isnow(st, fn);
    },
    isPast: function isPast() {
      return ispast(fn);
    },
    setNowOrPast: function setNowOrPast(now) {
      var past = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
      var fallback = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';

      if (!_.isNull(now) && isnow(st, fn)) return now;
      if (ispast(fn)) return past;
      return fallback;
    }
  };
};
;

var _temp = function () {
  if (typeof __REACT_HOT_LOADER__ === 'undefined') {
    return;
  }

  __REACT_HOT_LOADER__.register(isnow, 'isnow', 'src/utils/time_checker.js');

  __REACT_HOT_LOADER__.register(ispast, 'ispast', 'src/utils/time_checker.js');
}();

;