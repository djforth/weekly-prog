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
    global.expand_btn = mod.exports;
  }
})(this, function (module, exports, _react) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  exports.default = function (props) {
    return _react2.default.createElement(
      'div',
      { className: props.css },
      _react2.default.createElement(
        'a',
        { href: '#',
          onClick: props.expand,
          className: 'svg-information',
          title: props.text },
        _react2.default.createElement(
          'svg',
          { id: 'icons', xmlns: 'http://www.w3.org/2000/svg', viewBox: '0 0 42 42', width: '35', height: '35' },
          _react2.default.createElement(
            'title',
            null,
            props.text
          ),
          _react2.default.createElement('circle', { style: info_styles, cx: '21', cy: '21', r: '20' }),
          _react2.default.createElement('line', { style: info_styles, x1: '21', y1: '17.4', x2: '21', y2: '31.2' }),
          _react2.default.createElement('ellipse', { style: info_styles, cx: '21', cy: '11.2', rx: '0.6', ry: '0.4' })
        )
      )
    );
  };

  var _react2 = _interopRequireDefault(_react);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  var info_styles = {
    fill: 'none',
    stroke: '#e14e00',
    strokeLinecap: 'round',
    strokeLinejoin: 'round',
    strokeWidth: 2
  };

  ;
  module.exports = exports['default'];
});