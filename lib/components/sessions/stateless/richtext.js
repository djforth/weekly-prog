(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['module', 'exports', 'lodash/isString', 'react'], factory);
  } else if (typeof exports !== "undefined") {
    factory(module, exports, require('lodash/isString'), require('react'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod, mod.exports, global.isString, global.react);
    global.richtext = mod.exports;
  }
})(this, function (module, exports, _isString2, _react) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  exports.default = function (props) {
    if ((0, _isString3.default)(props.content) && props.content.match(/<|>/g)) {
      return _react2.default.createElement('div', { dangerouslySetInnerHTML: createMarkup(props.content) });
    }

    return _react2.default.createElement(
      'span',
      null,
      props.content
    );
  };

  var _isString3 = _interopRequireDefault(_isString2);

  var _react2 = _interopRequireDefault(_react);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  function createMarkup(content) {
    return { __html: content };
  }

  ;
  module.exports = exports['default'];
});