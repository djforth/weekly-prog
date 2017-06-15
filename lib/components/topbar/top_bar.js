(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['exports', 'react', 'moment', '../../stores/sessions_store', 'morse-react-mixins', './calendar', './stateless/print_btn'], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require('react'), require('moment'), require('../../stores/sessions_store'), require('morse-react-mixins'), require('./calendar'), require('./stateless/print_btn'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.react, global.moment, global.sessions_store, global.morseReactMixins, global.calendar, global.print_btn);
    global.top_bar = mod.exports;
  }
})(this, function (exports, _react, _moment, _sessions_store, _morseReactMixins, _calendar, _print_btn) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _react2 = _interopRequireDefault(_react);

  var _moment2 = _interopRequireDefault(_moment);

  var _sessions_store2 = _interopRequireDefault(_sessions_store);

  var _calendar2 = _interopRequireDefault(_calendar);

  var _print_btn2 = _interopRequireDefault(_print_btn);

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

  var TopBar = function (_React$Component) {
    _inherits(TopBar, _React$Component);

    function TopBar(props) {
      _classCallCheck(this, TopBar);

      var _this = _possibleConstructorReturn(this, (TopBar.__proto__ || Object.getPrototypeOf(TopBar)).call(this, props));

      _this.state = { current: (0, _moment2.default)() };
      return _this;
    }

    _createClass(TopBar, [{
      key: 'componentWillMount',
      value: function componentWillMount() {
        _sessions_store2.default.addChangeListener('changing_date', this._changeDate.bind(this));
      }
    }, {
      key: 'componentWillUnmount',
      value: function componentWillUnmount() {
        _sessions_store2.default.removeChangeListener('changing_date', this._changeDate);
      }
    }, {
      key: '_changeDate',
      value: function _changeDate() {
        var date = _sessions_store2.default._getCurrentDate();
        this.setState({ current: (0, _moment2.default)(date) });
      }
    }, {
      key: '_setUrl',
      value: function _setUrl() {
        var date_str = this.state.current.format('YYYY/MM/DD');
        return this.props.print.replace(':date', date_str);
      }
    }, {
      key: 'render',
      value: function render() {
        return _react2.default.createElement(
          'div',
          { className: 'clearfix calendar-bar' },
          _react2.default.createElement(_calendar2.default, {
            device: this.props.device,
            current: this.state.current
          }),
          _react2.default.createElement(_print_btn2.default, {
            print: this.props.print,
            url: this._setUrl()
          })
        );
      }
    }]);

    return TopBar;
  }(_react2.default.Component);

  Object.assign(TopBar.prototype, _morseReactMixins.css_mixins);
  Object.assign(TopBar.prototype, _morseReactMixins.text_mixins);

  exports.default = TopBar;
});