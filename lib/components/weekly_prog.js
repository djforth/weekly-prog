(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['module', 'exports', 'lodash/map', 'lodash/isEmpty', 'lodash/defer', 'react', 'moment', 'morse-react-mixins', 'viewport-detection-es6', '../actions/columns_actions', '../actions/sessions_actions', '../stores/sessions_store', './nav/date_nav', './sessions/period_sessions', './topbar/top_bar', 'moment/locale/cy'], factory);
  } else if (typeof exports !== "undefined") {
    factory(module, exports, require('lodash/map'), require('lodash/isEmpty'), require('lodash/defer'), require('react'), require('moment'), require('morse-react-mixins'), require('viewport-detection-es6'), require('../actions/columns_actions'), require('../actions/sessions_actions'), require('../stores/sessions_store'), require('./nav/date_nav'), require('./sessions/period_sessions'), require('./topbar/top_bar'), require('moment/locale/cy'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod, mod.exports, global.map, global.isEmpty, global.defer, global.react, global.moment, global.morseReactMixins, global.viewportDetectionEs6, global.columns_actions, global.sessions_actions, global.sessions_store, global.date_nav, global.period_sessions, global.top_bar, global.cy);
    global.weekly_prog = mod.exports;
  }
})(this, function (module, exports, _map2, _isEmpty2, _defer2, _react, _moment, _morseReactMixins, _viewportDetectionEs, _columns_actions, _sessions_actions, _sessions_store, _date_nav, _period_sessions, _top_bar) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _map3 = _interopRequireDefault(_map2);

  var _isEmpty3 = _interopRequireDefault(_isEmpty2);

  var _defer3 = _interopRequireDefault(_defer2);

  var _react2 = _interopRequireDefault(_react);

  var _moment2 = _interopRequireDefault(_moment);

  var _viewportDetectionEs2 = _interopRequireDefault(_viewportDetectionEs);

  var _columns_actions2 = _interopRequireDefault(_columns_actions);

  var _sessions_actions2 = _interopRequireDefault(_sessions_actions);

  var _sessions_store2 = _interopRequireDefault(_sessions_store);

  var _date_nav2 = _interopRequireDefault(_date_nav);

  var _period_sessions2 = _interopRequireDefault(_period_sessions);

  var _top_bar2 = _interopRequireDefault(_top_bar);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  var _extends = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };

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

  var WeeklyProg = function (_React$Component) {
    _inherits(WeeklyProg, _React$Component);

    function WeeklyProg(props) {
      _classCallCheck(this, WeeklyProg);

      var _this = _possibleConstructorReturn(this, (WeeklyProg.__proto__ || Object.getPrototypeOf(WeeklyProg)).call(this, props));

      _moment2.default.locale(props.locales);
      _sessions_actions2.default.setGroupby(_this.props.groupby);

      _this.percent = 0;
      _this.state = { sessions: [], keys: [], visible: [], device: 'desktop' };
      return _this;
    }

    _createClass(WeeklyProg, [{
      key: '_fetchData',
      value: function _fetchData() {
        _sessions_store2.default.removeChangeListener('api_set', this._fetchData);
        (0, _defer3.default)(function () {
          _sessions_actions2.default.fetchData();
        });
      }
    }, {
      key: '_getSessions',
      value: function _getSessions() {
        var session = _sessions_store2.default._getDate();
        if (!(0, _isEmpty3.default)(session)) {
          this.setState({ date: session.date, sessions: session.data });
        }
      }
    }, {
      key: '_renderPeriodSessions',
      value: function _renderPeriodSessions() {
        var _this2 = this;

        return (0, _map3.default)(this.props.timeperiod, function (tp) {
          return _react2.default.createElement(_period_sessions2.default, _extends({}, _this2.props, {
            devive: _this2.state.device,
            sessions: _this2.state.sessions,
            time: tp.time,
            title: tp.title,
            key: tp.title.toLowerCase() }));
        });
      }
    }, {
      key: 'componentWillMount',
      value: function componentWillMount() {
        _sessions_store2.default.addChangeListener('prerender', this._getSessions.bind(this));
        var ses = (0, _isEmpty3.default)(this.props.sessions) ? [] : this.props.sessions;
        _sessions_actions2.default.prerenderData(ses);
        _columns_actions2.default.addingColumns(this.props.columns);
        _columns_actions2.default.changeDevice(this.device);
      }
    }, {
      key: 'componentDidMount',
      value: function componentDidMount() {
        this.detect = new _viewportDetectionEs2.default();
        this.device = this.detect.getDevice();
        this.size = this.detect.windowSize();
        _columns_actions2.default.changeDevice(this.device);

        this.id = this.detect.trackSize(this._onDeviceChange.bind(this));
        _sessions_store2.default.addChangeListener('api_set', this._fetchData.bind(this));
        _sessions_actions2.default.setApi(this.props.sessionsApi);
      }
    }, {
      key: 'componentWillUnmount',
      value: function componentWillUnmount() {
        this.detect.removeCallback(this.id);
        _sessions_store2.default.removeChangeListener('prerender', this._getSessions);
      }
    }, {
      key: '_onDeviceChange',
      value: function _onDeviceChange(device, size) {
        if (this.device !== device) {
          this.device = device;
          _columns_actions2.default.changeDevice(device);
        }
        this.size = size;
      }
    }, {
      key: 'render',
      value: function render() {
        return _react2.default.createElement(
          'div',
          { className: 'weekly-prog' },
          _react2.default.createElement(_top_bar2.default, {
            device: this.state.device,
            print: this.props.print

          }),
          _react2.default.createElement(_date_nav2.default, null),
          _react2.default.createElement(
            'div',
            { id: 'sessions', className: 'clearfix' },
            this._renderPeriodSessions()
          )
        );
      }
    }]);

    return WeeklyProg;
  }(_react2.default.Component);

  Object.assign(WeeklyProg.prototype, _morseReactMixins.css_mixins);
  Object.assign(WeeklyProg.prototype, _morseReactMixins.text_mixinsimport);
  Object.assign(WeeklyProg.prototype, _morseReactMixins.widths_mixins);

  exports.default = WeeklyProg;
  module.exports = exports['default'];
});