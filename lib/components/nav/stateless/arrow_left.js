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
    global.arrow_left = mod.exports;
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
        className: 'nav-mover move-left',
        onClick: onClick
      },
      _react2.default.createElement(
        'div',
        { className: 'svg-arrow' },
        _react2.default.createElement(
          'svg',
          { viewBox: '0 0 15 25', xmlns: 'http://www.w3.org/2000/svg' },
          _react2.default.createElement(
            'title',
            null,
            'Left'
          ),
          _react2.default.createElement('path', { style: arrowStyles, d: 'M13.6 1.7L1.5 11.9c4.1 3.6 8.2 7.1 12.2 10.7' })
        )
      )
    );
  };

  module.exports = exports['default'];
});