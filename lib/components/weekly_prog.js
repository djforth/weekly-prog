'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

// Libraries
var React = require('react'),
    _ = require('lodash/core');

// Mixins
var cssMixins = require('morse-react-mixins').css_mixins,
    textMixins = require('morse-react-mixins').text_mixins,
    widthsMixins = require('morse-react-mixins').widths_mixins;

// Morse Libraies
var ViewportDetect = require('viewport-detection-es6');

// Flux
var ColumnsActions = require('../actions/columns_actions'),
    SessionsActions = require('../actions/sessions_actions'),
    SessionsStore = require('../stores/sessions_store');

// Components
var DateNav = require('./nav/date_nav'),
    PeriodSessions = require('./sessions/period_sessions'),
    TopBar = require('./topbar/top_bar');

var WeeklyProg = function (_React$Component) {
  _inherits(WeeklyProg, _React$Component);

  function WeeklyProg(props) {
    _classCallCheck(this, WeeklyProg);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(WeeklyProg).call(this, props));

    SessionsActions.setGroupby(_this.props.groupby);

    _this.percent = 0;
    _this.state = { sessions: [], keys: [], visible: [], device: 'desktop' };
    return _this;
  }

  _createClass(WeeklyProg, [{
    key: '_fetchData',
    value: function _fetchData() {
      SessionsStore.removeChangeListener('api_set', this._fetchData);
      _.defer(function () {
        SessionsActions.fetchData();
      });
    }
  }, {
    key: '_getSessions',
    value: function _getSessions() {
      var session = SessionsStore._getDate();
      if (!_.isEmpty(session)) {
        this.setState({ date: session.date, sessions: session.data });
      }
    }
  }, {
    key: '_renderPeriodSessions',
    value: function _renderPeriodSessions() {
      var _this2 = this;

      return _.map(this.props.timeperiod, function (tp) {
        return React.createElement(PeriodSessions, _extends({}, _this2.props, {
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
      SessionsStore.addChangeListener('prerender', this._getSessions.bind(this));
      var ses = _.isEmpty(this.props.sessions) ? [] : this.props.sessions;
      SessionsActions.prerenderData(ses);
      ColumnsActions.addingColumns(this.props.columns);
      ColumnsActions.changeDevice(this.device);
    }
  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.detect = new ViewportDetect();
      this.device = this.detect.getDevice();
      this.size = this.detect.windowSize();
      ColumnsActions.changeDevice(this.device);

      this.id = this.detect.trackSize(this._onDeviceChange.bind(this));
      SessionsStore.addChangeListener('api_set', this._fetchData.bind(this));
      SessionsActions.setApi(this.props.sessionsApi);
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      this.detect.removeCallback(this.id);
      SessionsStore.removeChangeListener('prerender', this._getSessions);
    }
  }, {
    key: '_onDeviceChange',
    value: function _onDeviceChange(device, size) {
      if (this.device !== device) {
        this.device = device;
        ColumnsActions.changeDevice(device);
      }
      this.size = size;
    }
  }, {
    key: 'render',
    value: function render() {
      return React.createElement(
        'div',
        { className: 'weekly-prog' },
        React.createElement(TopBar, {
          device: this.state.device,
          print: this.props.print
        }),
        React.createElement(DateNav, null),
        React.createElement(
          'div',
          { id: 'sessions', className: 'clearfix' },
          this._renderPeriodSessions()
        )
      );
    }
  }]);

  return WeeklyProg;
}(React.Component);

Object.assign(WeeklyProg.prototype, cssMixins);
Object.assign(WeeklyProg.prototype, textMixins);
Object.assign(WeeklyProg.prototype, widthsMixins);

module.exports = WeeklyProg;