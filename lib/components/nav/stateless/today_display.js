'use strict';

var _I18n_helper = require('@djforth/I18n_helper');

var _I18n_helper2 = _interopRequireDefault(_I18n_helper);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var React = require('react');

var wp = (0, _I18n_helper2.default)('javascript')('weekly_programme');

module.exports = function (props) {
  var fmt = props.date;
  if (props.device === 'mobile') {
    return React.createElement(
      'span',
      null,
      React.createElement(
        'span',
        { className: 'nav-date' },
        fmt.format('DD')
      ),
      React.createElement(
        'span',
        { className: 'nav-day' },
        wp('time_periods.today')
      )
    );
  }
  return React.createElement(
    'span',
    null,
    wp('time_periods.today') + ' ' + fmt.format('Do')
  );
};
;

var _temp = function () {
  if (typeof __REACT_HOT_LOADER__ === 'undefined') {
    return;
  }

  __REACT_HOT_LOADER__.register(wp, 'wp', 'src/components/nav/stateless/today_display.js');
}();

;