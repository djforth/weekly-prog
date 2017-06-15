(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['exports', 'react', 'react-date-range', './stateless/calendar_icon', '../../actions/sessions_actions'], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require('react'), require('react-date-range'), require('./stateless/calendar_icon'), require('../../actions/sessions_actions'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.react, global.reactDateRange, global.calendar_icon, global.sessions_actions);
    global.calendar = mod.exports;
  }
})(this, function (exports, _react, _reactDateRange, _calendar_icon, _sessions_actions) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _react2 = _interopRequireDefault(_react);

  var _calendar_icon2 = _interopRequireDefault(_calendar_icon);

  var _sessions_actions2 = _interopRequireDefault(_sessions_actions);

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

  var theme = {
    DateRange: {
      background: '#ffffff'
    },
    Calendar: {
      background: '#66ae44',
      color: '#ffffff'
    },
    MonthAndYear: {
      background: 'transparent',
      color: '#ffffff',
      fontFamily: 'Lato, Arial, Verdana, sans-serif',
      fontSize: '1em'
    },
    MonthAndYearMonth: {
      fontSize: '2em'
    },
    Day: {
      fontSize: '1em'
    },
    MonthButton: {
      background: '#66ae44'
    },
    MonthArrowPrev: {
      borderRightColor: '#ffffff'
    },
    MonthArrowNext: {
      borderLeftColor: '#ffffff'
    },
    Weekday: {
      color: '#255917'
    },
    DaySelected: {
      background: 'transparent',
      borderRadius: '0',
      borderBottom: '2px solid #e14e00'
    },
    DayActive: {
      background: '#ffffff',
      borderRadius: '5px'
    },
    DayInRange: {
      color: '#fff'
    },
    DayHover: {
      background: '#ffffff',
      borderRadius: '50px',
      color: '#7f8c8d'
    }
  };

  var CalendarHolder = function (_React$Component) {
    _inherits(CalendarHolder, _React$Component);

    function CalendarHolder(props) {
      _classCallCheck(this, CalendarHolder);

      var _this = _possibleConstructorReturn(this, (CalendarHolder.__proto__ || Object.getPrototypeOf(CalendarHolder)).call(this, props));

      _this.state = { open: false };
      return _this;
    }

    _createClass(CalendarHolder, [{
      key: '_openCalendar',
      value: function _openCalendar(e) {
        e.preventDefault();
        var open = !this.state.open;
        this.setState({ open: open });
      }
    }, {
      key: '_handleSelect',
      value: function _handleSelect(date) {
        this.setState({ open: false });
        _sessions_actions2.default.calendarChange(date.toDate());
      }
    }, {
      key: '_renderCalendar',
      value: function _renderCalendar() {
        if (!this.state.open) return '';

        return _react2.default.createElement(_reactDateRange.Calendar, {
          date: this.props.current,
          onChange: this._handleSelect.bind(this),
          linkedCalendars: true,
          theme: theme
        });
      }
    }, {
      key: '_formatDate',
      value: function _formatDate() {
        if (this.props.device !== 'mobile') {
          return this.props.current.format('MMMM');
        }
        return '';
      }
    }, {
      key: 'render',
      value: function render() {
        return _react2.default.createElement(
          'div',
          { className: 'calendar-btn' },
          _react2.default.createElement(
            'button',
            { onClick: this._openCalendar.bind(this) },
            _react2.default.createElement(_calendar_icon2.default, { title: this._formatDate() }),
            _react2.default.createElement(
              'span',
              { className: 'month-str' },
              this._formatDate()
            )
          ),
          _react2.default.createElement(
            'div',
            { className: 'calendar-holder' },
            this._renderCalendar()
          )
        );
      }
    }]);

    return CalendarHolder;
  }(_react2.default.Component);

  exports.default = CalendarHolder;
});