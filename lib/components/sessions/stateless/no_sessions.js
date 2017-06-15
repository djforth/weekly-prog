(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['exports', 'react'], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require('react'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.react);
    global.no_sessions = mod.exports;
  }
})(this, function (exports, _react) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  exports.default = function (props) {
    var key = void 0,
        nosession = void 0;
    key = props.title.toLowerCase() + '-nosessions';
    nosession = props.no_sessions || 'There are no sessions this';
    return _react2.default.createElement(
      'div',
      { className: 'cols-lg-12', key: key },
      _react2.default.createElement(
        'h5',
        { className: 'no-sessions' },
        nosession,
        ' ',
        props.title
      )
    );
  };

  var _react2 = _interopRequireDefault(_react);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  ;
});