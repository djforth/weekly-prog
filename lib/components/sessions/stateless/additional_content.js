(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['module', 'exports', 'react', '../../../utils/time_checker', '../../../utils/formatter', './time', './richtext'], factory);
  } else if (typeof exports !== "undefined") {
    factory(module, exports, require('react'), require('../../../utils/time_checker'), require('../../../utils/formatter'), require('./time'), require('./richtext'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod, mod.exports, global.react, global.time_checker, global.formatter, global.time, global.richtext);
    global.additional_content = mod.exports;
  }
})(this, function (module, exports, _react, _time_checker, _formatter, _time, _richtext) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  exports.default = function (props) {
    var col = void 0,
        getVal = void 0,
        item = void 0,
        value = void 0;
    item = props.item;
    col = props.col;
    getVal = (0, _formatter2.default)(item);
    value = getVal(col);

    if (col.type === 'time') {
      return _react2.default.createElement(_time2.default, {
        cols: col,
        checker: (0, _time_checker2.default)(item, col),
        time: value,
        cancelled: item.has('cancelled')
      });
    }

    return _react2.default.createElement(_richtext2.default, { content: value });
  };

  var _react2 = _interopRequireDefault(_react);

  var _time_checker2 = _interopRequireDefault(_time_checker);

  var _formatter2 = _interopRequireDefault(_formatter);

  var _time2 = _interopRequireDefault(_time);

  var _richtext2 = _interopRequireDefault(_richtext);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  ;

  // Components

  module.exports = exports['default'];
});