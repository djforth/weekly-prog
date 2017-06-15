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
    global.print_btn = mod.exports;
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

  var printStyles = {
    fill: 'none',
    stroke: '#585858',
    strokeWidth: 1.5,
    strokeLinecap: 'round',
    strokeLinejoin: 'round',
    strokeMiterlimit: 10
  };

  exports.default = function (_ref) {
    var url = _ref.url;

    return _react2.default.createElement(
      'a',
      { href: url, target: '_blank', className: 'svg-print', rel: 'nofollow' },
      _react2.default.createElement(
        'svg',
        { xmlns: 'http://www.w3.org/2000/svg', viewBox: '0 0 25 25' },
        _react2.default.createElement(
          'title',
          null,
          'Print Program'
        ),
        _react2.default.createElement(
          'g',
          { id: 'icons' },
          _react2.default.createElement('path', { style: printStyles, d: 'M6.4.7h12.2v4.5H6.4V.7zm0 17.8h-4V5.1h20.3v13.4h-4.1' }),
          _react2.default.createElement('path', { style: printStyles, d: 'M6.4 15.2h12.2v8.9H6.4v-8.9zm-2 0h16.2M8.5 20.8h8.1m-8.1-2.3h8.1' }),
          _react2.default.createElement('ellipse', { style: printStyles, cx: '19', cy: '10.7', rx: '1', ry: '1.1' })
        )
      )
    );
  };

  module.exports = exports['default'];
});