(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['exports', 'lodash/isUndefined', 'lodash/has', 'react', '../../../utils/time_checker'], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require('lodash/isUndefined'), require('lodash/has'), require('react'), require('../../../utils/time_checker'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.isUndefined, global.has, global.react, global.time_checker);
    global.wrapper = mod.exports;
  }
})(this, function (exports, _isUndefined2, _has2, _react, _time_checker) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  exports.default = function (props) {
    var css = setCss(props.item, props.col);
    return _react2.default.createElement(
      'div',
      { className: css },
      props.children
    );
  };

  var _isUndefined3 = _interopRequireDefault(_isUndefined2);

  var _has3 = _interopRequireDefault(_has2);

  var _react2 = _interopRequireDefault(_react);

  var _time_checker2 = _interopRequireDefault(_time_checker);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  function setCss(item, col) {
    if (!(0, _has3.default)(col, 'wrapper')) return '';

    if (!col.type === 'time' || (0, _isUndefined3.default)(col.concat)) return col.wrapper;

    var checker = (0, _time_checker2.default)(item, col);
    return col.wrapper + ' ' + checker.setNowOrPast('now', 'old-session');
  }

  ;
});