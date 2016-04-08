'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var React = require('react'),
    Moment = require('moment');

var Calendar = require('react-date-range').Calendar;
// console.log(Calendar)

//Flux
var SessionsActions = require('../../actions/sessions_actions');

var CalendarHolder = function (_React$Component) {
  _inherits(CalendarHolder, _React$Component);

  function CalendarHolder(props) {
    _classCallCheck(this, CalendarHolder);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(CalendarHolder).call(this, props));

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
      SessionsActions.calendarChange(date.toDate());
    }
  }, {
    key: '_renderCalendar',
    value: function _renderCalendar() {
      if (!this.state.open) return '';
      return React.createElement(Calendar, {
        date: this.props.current,
        onChange: this._handleSelect.bind(this),
        linkedCalendars: true,
        theme: {
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
            // border : '1px solid red'
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
        }
      });
    }
  }, {
    key: '_formatDate',
    value: function _formatDate() {
      return this.props.device === 'mobile' ? '' : this.props.current.format('MMMM');
    }
  }, {
    key: 'render',
    value: function render() {
      return React.createElement(
        'div',
        { className: 'calendar-btn' },
        React.createElement(
          'button',
          { onClick: this._openCalendar.bind(this) },
          React.createElement('i', { className: 'calendar-icon' }),
          React.createElement(
            'span',
            { className: 'month-str' },
            this._formatDate()
          )
        ),
        React.createElement(
          'div',
          { className: 'calendar-holder' },
          this._renderCalendar()
        )
      );
    }
  }]);

  return CalendarHolder;
}(React.Component);

module.exports = CalendarHolder;