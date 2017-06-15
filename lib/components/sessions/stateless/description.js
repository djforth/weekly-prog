(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['exports', 'react', './richtext'], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require('react'), require('./richtext'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.react, global.richtext);
    global.description = mod.exports;
  }
})(this, function (exports, _react, _richtext) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  exports.default = function (props) {
    return _react2.default.createElement(
      'div',
      { className: 'description' },
      _react2.default.createElement(_richtext2.default, { content: props.content })
    );
  };

  var _react2 = _interopRequireDefault(_react);

  var _richtext2 = _interopRequireDefault(_richtext);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  ;
});