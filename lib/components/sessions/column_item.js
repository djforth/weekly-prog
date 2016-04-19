'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var React = require('react'),
    _ = require('lodash/core');

var timeChecker = require('../../utils/time_checker'),
    formatter = require('../../utils/formatter');

// Components
var BookBtn = require('./stateless/book_btn'),
    Time = require('./stateless/time'),
    RichText = require('./stateless/richtext'),
    Wrapper = require('./stateless/wrapper');

// Mixins
var mixins = require('morse-react-mixins');
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
    key: '_checkbtn',
    value: function _checkbtn(item) {
      return item.has('buttons') && item.get('buttons').has('book');
    }
  }, {
    key: '_actions',
    value: function _actions() {
      var item = void 0,
          places = void 0,
          link = void 0;
      item = this.props.item;
      places = item.get('places_left');
      link = this._checkbtn(item) ? item.get('buttons').get('book') : null;
      return React.createElement(BookBtn, { places: places, link: link });
    }
  }, {
    key: '_showContent',
    value: function _showContent(value) {
      return React.createElement(RichText, { content: value });
    }
  }, {
    key: '_showTime',
    value: function _showTime(value) {
      var cancelled = void 0,
          item = void 0;
      item = this.props.item;
      cancelled = item.has('cancelled') ? item.get('cancelled') : false;
      return React.createElement(Time, {
        cols: this.props.col,
        checker: timeChecker(item, this.props.col),
        time: value,
        cancelled: cancelled
      });
    }
  }, {
    key: '_showValues',
    value: function _showValues() {
      var col = this.props.col;
      if (col.key === 'actions') return this._actions(col);
      var value = this.formatter(col);

      if (_.isString(value) && value.match(/<|>/g)) {
        return React.createElement(RichText, { content: value });
      }

      if (col.type === 'time') {
        return this._showTime(value);
      }

      return value;
    }
  }, {
    key: 'render',
    value: function render() {
      var col = void 0,
          css = void 0;
      col = this.props.col;
      css = this.checkCss(this.props.css, col.key);
      return React.createElement(
        'div',
        { className: css, key: _.uniqueId('dataItem') },
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