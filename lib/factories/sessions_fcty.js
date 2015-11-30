"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _ = require("lodash");
var DataManager = require("datamanager");

var SessionsFcty = (function (_DataManager) {
  _inherits(SessionsFcty, _DataManager);

  function SessionsFcty() {
    _classCallCheck(this, SessionsFcty);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(SessionsFcty).apply(this, arguments));
  }

  _createClass(SessionsFcty, [{
    key: "checkInPeriod",
    value: function checkInPeriod(time, st, fn) {
      if (!(_.isNumber(st) && _.isNumber(fn) && _.isDate(time))) {
        return false;
      }
      // console.log(time.getHours())
      // console.log(st, fn);
      return time.getHours() >= st && time.getHours() <= fn;
    }
  }, {
    key: "getTimePeriod",
    value: function getTimePeriod(st, fn) {
      var _this2 = this;

      return this.data.filter(function (d) {
        var time = d.get(_this2.key);
        // console.log(time, this.checkInPeriod(time, st, fn))
        return _this2.checkInPeriod(time, st, fn);
      });
    }
  }, {
    key: "setTimeKey",
    value: function setTimeKey(key) {
      this.key = key;
    }
  }]);

  return SessionsFcty;
})(DataManager);

module.exports = SessionsFcty;
//# sourceMappingURL=sessions_fcty.js.map