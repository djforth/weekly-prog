(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['exports', 'lodash/includes', 'lodash/isArray', 'lodash/isDate', 'lodash/isNumber', 'datamanager', 'immutable'], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require('lodash/includes'), require('lodash/isArray'), require('lodash/isDate'), require('lodash/isNumber'), require('datamanager'), require('immutable'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.includes, global.isArray, global.isDate, global.isNumber, global.datamanager, global.immutable);
    global.sessions_fcty = mod.exports;
  }
})(this, function (exports, _includes2, _isArray2, _isDate2, _isNumber2, _datamanager, _immutable) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _includes3 = _interopRequireDefault(_includes2);

  var _isArray3 = _interopRequireDefault(_isArray2);

  var _isDate3 = _interopRequireDefault(_isDate2);

  var _isNumber3 = _interopRequireDefault(_isNumber2);

  var _datamanager2 = _interopRequireDefault(_datamanager);

  var _immutable2 = _interopRequireDefault(_immutable);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var _createClass = function () {
    function defineProperties(target, props) {
      for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor) descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
      }
    }

    return function (Constructor, protoProps, staticProps) {
      if (protoProps) defineProperties(Constructor.prototype, protoProps);
      if (staticProps) defineProperties(Constructor, staticProps);
      return Constructor;
    };
  }();

  function _possibleConstructorReturn(self, call) {
    if (!self) {
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }

    return call && (typeof call === "object" || typeof call === "function") ? call : self;
  }

  function _inherits(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
      throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
    }

    subClass.prototype = Object.create(superClass && superClass.prototype, {
      constructor: {
        value: subClass,
        enumerable: false,
        writable: true,
        configurable: true
      }
    });
    if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
  }

  var SessionsFcty = function (_DataManager) {
    _inherits(SessionsFcty, _DataManager);

    function SessionsFcty() {
      _classCallCheck(this, SessionsFcty);

      return _possibleConstructorReturn(this, (SessionsFcty.__proto__ || Object.getPrototypeOf(SessionsFcty)).apply(this, arguments));
    }

    _createClass(SessionsFcty, [{
      key: 'checkInPeriod',
      value: function checkInPeriod(time, st, fn) {
        if (!((0, _isNumber3.default)(st) && (0, _isNumber3.default)(fn) && (0, _isDate3.default)(time))) {
          return false;
        }

        return time.getHours() >= st && time.getHours() <= fn;
      }
    }, {
      key: 'checkFilter',
      value: function checkFilter(filter, id) {
        if ((0, _isArray3.default)(filter)) return (0, _includes3.default)(filter, id);

        return filter === id;
      }
    }, {
      key: 'filter',
      value: function filter(key, id) {
        var _this2 = this;

        if (!this.data) return _immutable2.default.fromJS([]);

        return this.data.filter(function (d) {
          if (!d.has('filters')) return false;

          var filters = d.get('filters');
          if (!filters.has(key)) return false;

          return _this2.checkFilter(filters.get(key), id);
        });
      }
    }, {
      key: 'getTimePeriod',
      value: function getTimePeriod(st, fn) {
        var _this3 = this;

        if (!this.data) return _immutable2.default.fromJS([]);

        if (!this.key) return this.data;

        return this.data.filter(function (d) {
          if (!d.has(_this3.key)) return false;

          var time = d.get(_this3.key);
          return _this3.checkInPeriod(time, st, fn);
        });
      }
    }, {
      key: 'setTimeKey',
      value: function setTimeKey(key) {
        this.key = key;
      }
    }, {
      key: 'size',
      value: function size() {
        return this.data ? this.data.size : 0;
      }
    }]);

    return SessionsFcty;
  }(_datamanager2.default);

  exports.default = SessionsFcty;
});