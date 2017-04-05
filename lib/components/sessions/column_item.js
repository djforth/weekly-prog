var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React from 'react';

import _ from 'lodash/core';

import ButtonCheck from '../../helpers/buttons_helper';

import timeChecker from '../../utils/time_checker';

import formatter from '../../utils/formatter';

// Components

import BookBtn from './stateless/book_btn';

import Time from './stateless/time';

import RichText from './stateless/richtext';

import Wrapper from './stateless/wrapper';

// Mixins

import mixins from 'morse-react-mixins';
var _ref = [mixins.css_mixins, mixins.text_mixins],
    cssMixins = _ref[0],
    textMixins = _ref[1];

var ColumnItem = function (_React$Component) {
  _inherits(ColumnItem, _React$Component);

  function ColumnItem(props) {
    _classCallCheck(this, ColumnItem);

    var _this = _possibleConstructorReturn(this, (ColumnItem.__proto__ || Object.getPrototypeOf(ColumnItem)).call(this, props));

    _this.formatter = formatter(_this.props.item);
    return _this;
  }

  _createClass(ColumnItem, [{
    key: '_actions',
    value: function _actions() {
      var item = void 0,
          places = void 0;
      item = this.props.item;
      places = item.get('places_left');

      var _ButtonCheck = ButtonCheck(item),
          link = _ButtonCheck.link,
          title = _ButtonCheck.title,
          instruction = _ButtonCheck.instruction;

      return React.createElement(BookBtn, { places: places, link: link, title: title, instruction: instruction });
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

export default ColumnItem;