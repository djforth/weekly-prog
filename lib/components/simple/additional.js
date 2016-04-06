"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var React = require("react"),
    _ = require("lodash/core");

var timeChecker = require("../utils/time_checker"),
    formatter = require("../utils/formatter");

// Components
var BookBtn = require('./simple/book_btn'),
    Time = require('./simple/time'),
    RichText = require('./simple/richtext'),
    Wrapper = require('./simple/wrapper');

var Additional = function (_React$Component) {
  _inherits(Additional, _React$Component);

  function Additional(props) {
    _classCallCheck(this, Additional);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Additional).call(this, props));

    _this.formatter = formatter(_this.props.item);
    return _this;
  }

  _createClass(Additional, [{
    key: "_actions",
    value: function _actions(col) {
      var item = this.props.item;
      var places = item.get("places_left");
      var link = item.has("buttons") && item.get("buttons").has("book") ? item.get("buttons").get("book") : null;

      return React.createElement(BookBtn, { places: places, link: link });
    }
  }, {
    key: "_showContent",
    value: function _showContent(value) {
      return React.createElement(RichText, { content: value });
    }
  }, {
    key: "_showTime",
    value: function _showTime(value) {
      return React.createElement(Time, {
        cols: this.props.col,
        checker: timeChecker(this.props.item, this.props.col),
        time: value,
        cancelled: this.props.item.has('cancelled')

      });
    }
  }, {
    key: "_showValues",
    value: function _showValues() {
      var col = this.props.col;
      if (col.key === "actions") return this._actions(col);
      var value = this.formatter(col);
      if (_.isString(value) && value.match(/<|>/g)) return this._rawMarkup(value);
      if (col.type !== "time") return value;

      return this._showTime(value);
    }
  }, {
    key: "render",
    value: function render() {
      var col = this.props.col;
      return React.createElement(
        "li",
        { className: "list-group-item col-md-4", key: this._createKey(col.title) },
        React.createElement(
          "strong",
          null,
          col.title,
          ":"
        ),
        this._showValues()
      );
    }
  }]);

  return Additional;
}(React.Component);

module.exports = Additional;
//# sourceMappingURL=additional.js.map