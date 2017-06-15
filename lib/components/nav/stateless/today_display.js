(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['module', 'exports', 'react', '@morsedigital/i18n_helper'], factory);
  } else if (typeof exports !== "undefined") {
    factory(module, exports, require('react'), require('@morsedigital/i18n_helper'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod, mod.exports, global.react, global.i18n_helper);
    global.today_display = mod.exports;
  }
})(this, function (module, exports, _react, _i18n_helper) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  exports.default = function (props) {
    var fmt = props.date;
    if (props.device === 'mobile') {
      return _react2.default.createElement(
        'span',
        null,
        _react2.default.createElement(
          'span',
          { className: 'nav-date' },
          fmt.format('DD')
        ),
        _react2.default.createElement(
          'span',
          { className: 'nav-day' },
          wp('time_periods.today')
        )
      );
    }
    return _react2.default.createElement(
      'span',
      null,
      wp('time_periods.today') + ' ' + fmt.format('Do')
    );
  };

  var _react2 = _interopRequireDefault(_react);

  var _i18n_helper2 = _interopRequireDefault(_i18n_helper);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  var wp = (0, _i18n_helper2.default)('javascript')('weekly_programme');

  ;
  module.exports = exports['default'];
});