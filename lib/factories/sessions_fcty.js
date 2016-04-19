'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _ = require('lodash/core');
var DataManager = require('datamanager');
var Immutable = require('immutable');

var SessionsFcty = function (_DataManager) {
  _inherits(SessionsFcty, _DataManager);

  function SessionsFcty() {
    _classCallCheck(this, SessionsFcty);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(SessionsFcty).apply(this, arguments));
  }

  _createClass(SessionsFcty, [{
    key: 'checkInPeriod',
    value: function checkInPeriod(time, st, fn) {
      if (!(_.isNumber(st) && _.isNumber(fn) && _.isDate(time))) {
        return false;
      }

      return time.getHours() >= st && time.getHours() <= fn;
    }
  }, {
    key: 'checkFilter',
    value: function checkFilter(filter, id) {
      if (_.isArray(filter)) return _.includes(filter, id);

      return filter === id;
    }
  }, {
    key: 'filter',
    value: function filter(key, id) {
      var _this2 = this;

      if (!this.data) return Immutable.fromJS([]);

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

      if (!this.data) return Immutable.fromJS([]);

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
}(DataManager);

module.exports = SessionsFcty;
//# sourceMappingURL=sessions_fcty.js.map