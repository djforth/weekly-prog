(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['module', 'exports', 'react', './cancelled'], factory);
  } else if (typeof exports !== "undefined") {
    factory(module, exports, require('react'), require('./cancelled'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod, mod.exports, global.react, global.cancelled);
    global.time = mod.exports;
  }
})(this, function (module, exports, _react, _cancelled) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  exports.default = function (props) {
    if (props.cancelled) {
      return _react2.default.createElement(_cancelled2.default, { time: props.time });
    }

    return _react2.default.createElement(
      'span',
      { title: titleCreator(props.checker, props.time) },
      props.time
    );
  };

  var _react2 = _interopRequireDefault(_react);

  var _cancelled2 = _interopRequireDefault(_cancelled);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  function titleCreator(checker, time) {
    return checker.setNowOrPast('This session has started', 'This session has finished', 'This sessions runs between ' + time);
  }

  ;
  module.exports = exports['default'];
});