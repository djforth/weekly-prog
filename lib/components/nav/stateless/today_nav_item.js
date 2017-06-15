(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['module', 'exports', 'react', './today_display'], factory);
  } else if (typeof exports !== "undefined") {
    factory(module, exports, require('react'), require('./today_display'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod, mod.exports, global.react, global.today_display);
    global.today_nav_item = mod.exports;
  }
})(this, function (module, exports, _react, _today_display) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  exports.default = function (props) {
    var css = void 0,
        item = void 0;
    item = props.nav_item;
    css = 'date-nav-item today-nav ' + props.active;
    return _react2.default.createElement(
      'div',
      { role: 'presentation', className: css },
      _react2.default.createElement(
        'a',
        { href: '#',
          title: item.alt,
          onClick: props.onClick,
          className: 'date-nav-item-link'
        },
        _react2.default.createElement(_today_display2.default, {
          device: props.device,
          date: item.fmt
        })
      )
    );
  };

  var _react2 = _interopRequireDefault(_react);

  var _today_display2 = _interopRequireDefault(_today_display);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  ;
  module.exports = exports['default'];
});