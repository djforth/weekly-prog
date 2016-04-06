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

//Mixins
var mixins = require("morse-react-mixins");
var cssMixins = mixins.css_mixins;
var textMixins = mixins.text_mixins;

var ColumnItem = function (_React$Component) {
  _inherits(ColumnItem, _React$Component);

  function ColumnItem(props) {
    _classCallCheck(this, ColumnItem);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(ColumnItem).call(this, props));

    _this.formatter = formatter(_this.props.item);
    return _this;
  }

  _createClass(ColumnItem, [{
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
      // alert(`Value: ${value}`)
      // if(value === "true -  true"){
      //   alert(`Value: ${value}`)
      // }
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

      if (_.isString(value) && value.match(/<|>/g)) return React.createElement(RichText, { content: value });
      if (col.type === "time") {
        return this._showTime(value);
      }

      return value;
    }
  }, {
    key: "render",
    value: function render() {
      var col = this.props.col;
      return React.createElement(
        "div",
        { className: this.checkCss(this.props.css, col.key), key: _.uniqueId("dataItem") },
        React.createElement(
          Wrapper,
          { item: this.props.item, col: col },
          this._showValues()
        )
      );
    }
  }]);

  return ColumnItem;
}(React.Component);

Object.assign(ColumnItem.prototype, cssMixins);
Object.assign(ColumnItem.prototype, textMixins);

module.exports = ColumnItem;
//# sourceMappingURL=column_item.js.map