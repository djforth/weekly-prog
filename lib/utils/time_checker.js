(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['module', 'exports', 'lodash/isNull', 'lodash/values', 'lodash/pick', 'moment'], factory);
  } else if (typeof exports !== "undefined") {
    factory(module, exports, require('lodash/isNull'), require('lodash/values'), require('lodash/pick'), require('moment'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod, mod.exports, global.isNull, global.values, global.pick, global.moment);
    global.time_checker = mod.exports;
  }
})(this, function (module, exports, _isNull2, _values4, _pick2, _moment) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  exports.default = function (item, col) {
    var times = (0, _pick3.default)(col, ['key', 'concat']);

    var _values2 = (0, _values5.default)(times),
        _values3 = _slicedToArray(_values2, 2),
        stk = _values3[0],
        fnk = _values3[1];

    var _ref = [item.get(stk), item.get(fnk)],
        st = _ref[0],
        fn = _ref[1];


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

        if (!(0, _isNull3.default)(now) && isnow(st, fn)) return now;
        if (ispast(fn)) return past;
        return fallback;
      }
    };
  };

  var _isNull3 = _interopRequireDefault(_isNull2);

  var _values5 = _interopRequireDefault(_values4);

  var _pick3 = _interopRequireDefault(_pick2);

  var _moment2 = _interopRequireDefault(_moment);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  var _slicedToArray = function () {
    function sliceIterator(arr, i) {
      var _arr = [];
      var _n = true;
      var _d = false;
      var _e = undefined;

      try {
        for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
          _arr.push(_s.value);

          if (i && _arr.length === i) break;
        }
      } catch (err) {
        _d = true;
        _e = err;
      } finally {
        try {
          if (!_n && _i["return"]) _i["return"]();
        } finally {
          if (_d) throw _e;
        }
      }

      return _arr;
    }

    return function (arr, i) {
      if (Array.isArray(arr)) {
        return arr;
      } else if (Symbol.iterator in Object(arr)) {
        return sliceIterator(arr, i);
      } else {
        throw new TypeError("Invalid attempt to destructure non-iterable instance");
      }
    };
  }();

  function isnow(st, fn) {
    var now = (0, _moment2.default)();
    return (now.isAfter(st) || now.isSame(st)) && (now.isBefore(fn) || now.isSame(fn));
  }

  function ispast(fn) {
    var now = (0, _moment2.default)();
    return now.isAfter(fn);
  }

  ;
  module.exports = exports['default'];
});