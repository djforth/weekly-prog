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
    global.arrow_right = mod.exports;
  }
})(this, function (module, exports, _react) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _react2 = _interopRequireDefault(_react);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  var arrowStyles = {
    fill: 'none',
    stroke: '#cfcfcf',
    strokeWidth: 2,
    strokeLinecap: 'round',
    strokeLinejoin: 'round',
    strokeMiterlimit: 10
  };

  exports.default = function (_ref) {
    var onClick = _ref.onClick;

    return _react2.default.createElement(
      'a',
      { href: '#',
        className: 'nav-mover move-right svg-arrow-right',
        onClick: onClick },
      _react2.default.createElement(
        'div',
        { className: 'svg-arrow' },
        _react2.default.createElement(
          'svg',
          { viewBox: '0 0 15 25', xmlns: 'http://www.w3.org/2000/svg' },
          _react2.default.createElement('path', { style: arrowStyles, d: 'M1.8 23.2L13.9 13C9.9 9.4 5.8 5.8 1.8 2.2' })
        )
      )
    );
  };

  module.exports = exports['default'];
});