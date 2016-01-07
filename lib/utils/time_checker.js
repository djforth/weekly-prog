"use strict";

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _ = require("lodash"),
    Moment = require("moment");

function _isNow(st, fn) {
  var now = Moment();
  return (now.isAfter(st) || now.isSame(st)) && (now.isBefore(fn) || now.isSame(fn));
}

function _isPast(fn) {
  var now = Moment();
  return now.isAfter(fn);
}

module.exports = function (item, col) {
  var times = _.pick(col, function (v, k) {
    return _.includes(["key", "concat"], k);
  });

  var _$values = _.values(times);

  var _$values2 = _slicedToArray(_$values, 2);

  var stk = _$values2[0];
  var fnk = _$values2[1];
  var st = item.get(stk);
  var fn = item.get(fnk);

  return {
    isNow: function isNow() {
      return _isNow(st, fn);
    },
    isPast: function isPast() {
      return _isPast(fn);
    },
    setNowOrPast: function setNowOrPast(now) {
      var past = arguments.length <= 1 || arguments[1] === undefined ? "" : arguments[1];
      var fallback = arguments.length <= 2 || arguments[2] === undefined ? "" : arguments[2];

      if (_isNow(st, fn)) return now;
      if (_isPast(fn)) return past;
      return fallback;
    }

  };
};
//# sourceMappingURL=time_checker.js.map