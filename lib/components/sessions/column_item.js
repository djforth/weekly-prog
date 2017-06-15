(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['exports', 'lodash/uniqueId', 'lodash/isString', 'react', '../../helpers/buttons_helper', '../../utils/time_checker', '../../utils/formatter', './stateless/book_btn', './stateless/time', './stateless/richtext', './stateless/wrapper', 'morse-react-mixins'], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require('lodash/uniqueId'), require('lodash/isString'), require('react'), require('../../helpers/buttons_helper'), require('../../utils/time_checker'), require('../../utils/formatter'), require('./stateless/book_btn'), require('./stateless/time'), require('./stateless/richtext'), require('./stateless/wrapper'), require('morse-react-mixins'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.uniqueId, global.isString, global.react, global.buttons_helper, global.time_checker, global.formatter, global.book_btn, global.time, global.richtext, global.wrapper, global.morseReactMixins);
    global.column_item = mod.exports;
  }
})(this, function (exports, _uniqueId2, _isString2, _react, _buttons_helper, _time_checker, _formatter, _book_btn, _time, _richtext, _wrapper, _morseReactMixins) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _uniqueId3 = _interopRequireDefault(_uniqueId2);

  var _isString3 = _interopRequireDefault(_isString2);

  var _react2 = _interopRequireDefault(_react);

  var _buttons_helper2 = _interopRequireDefault(_buttons_helper);

  var _time_checker2 = _interopRequireDefault(_time_checker);

  var _formatter2 = _interopRequireDefault(_formatter);

  var _book_btn2 = _interopRequireDefault(_book_btn);

  var _time2 = _interopRequireDefault(_time);

  var _richtext2 = _interopRequireDefault(_richtext);

  var _wrapper2 = _interopRequireDefault(_wrapper);

  var _morseReactMixins2 = _interopRequireDefault(_morseReactMixins);

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

  var _ref = [_morseReactMixins2.default.css_mixins, _morseReactMixins2.default.text_mixins],
      cssMixins = _ref[0],
      textMixins = _ref[1];

  var ColumnItem = function (_React$Component) {
    _inherits(ColumnItem, _React$Component);

    function ColumnItem(props) {
      _classCallCheck(this, ColumnItem);

      var _this = _possibleConstructorReturn(this, (ColumnItem.__proto__ || Object.getPrototypeOf(ColumnItem)).call(this, props));

      _this.formatter = (0, _formatter2.default)(_this.props.item);
      return _this;
    }

    _createClass(ColumnItem, [{
      key: '_actions',
      value: function _actions() {
        var item = void 0,
            places = void 0;
        item = this.props.item;
        places = item.get('places_left');

        var _ButtonCheck = (0, _buttons_helper2.default)(item),
            link = _ButtonCheck.link,
            title = _ButtonCheck.title,
            instruction = _ButtonCheck.instruction;

        return _react2.default.createElement(_book_btn2.default, { places: places, link: link, title: title, instruction: instruction });
      }
    }, {
      key: '_showContent',
      value: function _showContent(value) {
        return _react2.default.createElement(_richtext2.default, { content: value });
      }
    }, {
      key: '_showTime',
      value: function _showTime(value) {
        var cancelled = void 0,
            item = void 0;
        item = this.props.item;
        cancelled = item.has('cancelled') ? item.get('cancelled') : false;
        return _react2.default.createElement(_time2.default, {
          cols: this.props.col,
          checker: (0, _time_checker2.default)(item, this.props.col),
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

        if ((0, _isString3.default)(value) && value.match(/<|>/g)) {
          return _react2.default.createElement(_richtext2.default, { content: value });
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
        return _react2.default.createElement(
          'div',
          { className: css, key: (0, _uniqueId3.default)('dataItem') },
          _react2.default.createElement(
            _wrapper2.default,
            { item: this.props.item, col: col },
            this._showValues()
          )
        );
      }
    }]);

    return ColumnItem;
  }(_react2.default.Component);

  Object.assign(ColumnItem.prototype, cssMixins);
  Object.assign(ColumnItem.prototype, textMixins);

  exports.default = ColumnItem;
});