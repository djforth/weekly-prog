(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['module', 'exports', 'react', './day_display'], factory);
  } else if (typeof exports !== "undefined") {
    factory(module, exports, require('react'), require('./day_display'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod, mod.exports, global.react, global.day_display);
    global.nav_item = mod.exports;
  }
})(this, function (module, exports, _react, _day_display) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  exports.default = function (props) {
    var item = props.nav_item;
    return _react2.default.createElement(
      'li',
      { role: 'presentation', className: 'date-nav-item ' + props.active },
      _react2.default.createElement(
        'a',
        { href: '#',
          title: item.alt,
          onClick: props.onClick,
          className: 'date-nav-item-link'
        },
        _react2.default.createElement(_day_display2.default, {
          device: props.device,
          date: item.fmt
        })
      )
    );
  };

  var _react2 = _interopRequireDefault(_react);

  var _day_display2 = _interopRequireDefault(_day_display);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  ;
  module.exports = exports['default'];
});