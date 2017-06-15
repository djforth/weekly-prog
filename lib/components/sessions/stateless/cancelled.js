(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['exports', 'react', '@morsedigital/i18n_helper'], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require('react'), require('@morsedigital/i18n_helper'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.react, global.i18n_helper);
    global.cancelled = mod.exports;
  }
})(this, function (exports, _react, _i18n_helper) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  exports.default = function (props) {
    var title = 'The session between ' + props.time + ' is cancelled';
    return _react2.default.createElement(
      'span',
      { title: title },
      wp('additional.cancelled')
    );
  };

  var _react2 = _interopRequireDefault(_react);

  var _i18n_helper2 = _interopRequireDefault(_i18n_helper);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  var wp = (0, _i18n_helper2.default)('javascript')('weekly_programme');

  ;
});