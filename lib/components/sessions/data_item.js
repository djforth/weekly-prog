(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['module', 'exports', 'lodash/isEmpty', 'lodash/includes', 'lodash/map', 'react', '../../stores/columns_store', '../../utils/formatter', '@morsedigital/i18n_helper', 'morse-react-mixins', './column_item', './stateless/expand_btn'], factory);
  } else if (typeof exports !== "undefined") {
    factory(module, exports, require('lodash/isEmpty'), require('lodash/includes'), require('lodash/map'), require('react'), require('../../stores/columns_store'), require('../../utils/formatter'), require('@morsedigital/i18n_helper'), require('morse-react-mixins'), require('./column_item'), require('./stateless/expand_btn'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod, mod.exports, global.isEmpty, global.includes, global.map, global.react, global.columns_store, global.formatter, global.i18n_helper, global.morseReactMixins, global.column_item, global.expand_btn);
    global.data_item = mod.exports;
  }
})(this, function (module, exports, _isEmpty2, _includes2, _map2, _react, _columns_store, _formatter, _i18n_helper, _morseReactMixins, _column_item, _expand_btn) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _isEmpty3 = _interopRequireDefault(_isEmpty2);

  var _includes3 = _interopRequireDefault(_includes2);

  var _map3 = _interopRequireDefault(_map2);

  var _react2 = _interopRequireDefault(_react);

  var _columns_store2 = _interopRequireDefault(_columns_store);

  var _formatter2 = _interopRequireDefault(_formatter);

  var _i18n_helper2 = _interopRequireDefault(_i18n_helper);

  var _morseReactMixins2 = _interopRequireDefault(_morseReactMixins);

  var _column_item2 = _interopRequireDefault(_column_item);

  var _expand_btn2 = _interopRequireDefault(_expand_btn);

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

  var wp = (0, _i18n_helper2.default)('javascript')('weekly_programme');

  // Mixins

  var _ref = [_morseReactMixins2.default.css_mixins, _morseReactMixins2.default.text_mixins],
      cssMixins = _ref[0],
      textMixins = _ref[1];

  var DataItem = function (_React$Component) {
    _inherits(DataItem, _React$Component);

    function DataItem(props) {
      _classCallCheck(this, DataItem);

      var _this = _possibleConstructorReturn(this, (DataItem.__proto__ || Object.getPrototypeOf(DataItem)).call(this, props));

      _this.active = [{ active: false }];
      // this._select.bind(this);
      _this.formatter = (0, _formatter2.default)(_this.props.data);
      _this.state = { data: _this.props.data, columns: [], datefield: [] };
      return _this;
    }

    _createClass(DataItem, [{
      key: '_createKey',
      value: function _createKey(keys) {
        return this.createId(keys, this.props.data.get('id'));
      }
    }, {
      key: 'componentWillMount',
      value: function componentWillMount() {
        this.mounted = true;
        this.setState({ data: this.props.data, columns: _columns_store2.default.getVisible() });
        _columns_store2.default.addChangeListener('change', this._onChange.bind(this));
      }
    }, {
      key: 'componentWillUnmount',
      value: function componentWillUnmount() {
        this.mounted = false;
        _columns_store2.default.removeChangeListener('change', this._onChange);
      }
    }, {
      key: '_expandTest',
      value: function _expandTest(col) {
        if (col.key !== 'expand') return false;

        var visible = (0, _map3.default)(_columns_store2.default.getShowable(), 'key');

        return this.props.data.reduce(function (prev, curr, key) {
          if ((0, _includes3.default)(visible, key) && !(0, _isEmpty3.default)(curr)) {
            return true;
          }

          return prev;
        }, false);
      }
    }, {
      key: '_expander',
      value: function _expander() {
        var buttonText = wp('additional.more_info');
        return _react2.default.createElement(_expand_btn2.default, {
          css: this.checkCss(this.props.css, 'expand'),
          expand: this.props.expand,
          key: this._createKey('expand'),
          text: buttonText
        });
      }
    }, {
      key: '_onChange',
      value: function _onChange() {
        if (this.mounted) {
          this.setState({
            columns: _columns_store2.default.getVisible(),
            device: _columns_store2.default.getDevice()
          });
        }
      }
    }, {
      key: '_renderTd',
      value: function _renderTd() {
        var item = this.props.data;
        if (item && this.state.columns) {
          var td = (0, _map3.default)(this.state.columns, function (col) {
            if (this._expandTest(col)) {
              return this._expander();
            }

            return _react2.default.createElement(_column_item2.default, {
              css: this.props.css,
              col: col,
              item: item,
              key: this._createKey(col.key)
            });
          }.bind(this));

          return td;
        }
        return '';
      }
    }, {
      key: 'render',
      value: function render() {
        return _react2.default.createElement(
          'div',
          { className: 'clearfix' },
          this._renderTd()
        );
      }
    }]);

    return DataItem;
  }(_react2.default.Component);

  Object.assign(DataItem.prototype, cssMixins);
  Object.assign(DataItem.prototype, textMixins);

  exports.default = DataItem;
  module.exports = exports['default'];
});