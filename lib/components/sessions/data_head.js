(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['exports', 'lodash/map', 'react', 'morse-react-mixins', './stateless/heading'], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require('lodash/map'), require('react'), require('morse-react-mixins'), require('./stateless/heading'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.map, global.react, global.morseReactMixins, global.heading);
    global.data_head = mod.exports;
  }
})(this, function (exports, _map2, _react, _morseReactMixins, _heading) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _map3 = _interopRequireDefault(_map2);

  var _react2 = _interopRequireDefault(_react);

  var _heading2 = _interopRequireDefault(_heading);

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

  var DataHead = function (_React$Component) {
    _inherits(DataHead, _React$Component);

    function DataHead() {
      _classCallCheck(this, DataHead);

      return _possibleConstructorReturn(this, (DataHead.__proto__ || Object.getPrototypeOf(DataHead)).apply(this, arguments));
    }

    _createClass(DataHead, [{
      key: 'renderTh',
      value: function renderTh() {
        if (this.props.columns) {
          var th = (0, _map3.default)(this.props.columns, function (col) {
            return _react2.default.createElement(_heading2.default, {
              css: this.checkCss(this.props.css, col.key),
              key: this.createId(col.key, this.props.title),
              title: col.title });
          }.bind(this));

          return th;
        }

        return '';
      }
    }, {
      key: 'render',
      value: function render() {
        return _react2.default.createElement(
          'div',
          { className: 'thead' },
          _react2.default.createElement(
            'div',
            { className: 'tr' },
            this.renderTh()
          )
        );
      }
    }]);

    return DataHead;
  }(_react2.default.Component);

  Object.assign(DataHead.prototype, _morseReactMixins.css_mixins);
  Object.assign(DataHead.prototype, _morseReactMixins.text_mixins);

  exports.default = DataHead;
});