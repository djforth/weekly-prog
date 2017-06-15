(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['module', 'exports', 'react'], factory);
  } else if (typeof exports !== "undefined") {
    factory(module, exports, require('react'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod, mod.exports, global.react);
    global.day_display = mod.exports;
  }
})(this, function (module, exports, _react) {
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
          fmt.format('ddd')
        )
      );
    }

    return _react2.default.createElement(
      'span',
      null,
      fmt.format('ddd Do')
    );
  };

  var _react2 = _interopRequireDefault(_react);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  ;
  module.exports = exports['default'];
});