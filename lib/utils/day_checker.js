(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['module', 'exports', 'lodash/forEach'], factory);
  } else if (typeof exports !== "undefined") {
    factory(module, exports, require('lodash/forEach'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod, mod.exports, global.forEach);
    global.day_checker = mod.exports;
  }
})(this, function (module, exports, _forEach2) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  exports.default = function (check, checkee) {
    var test = false;

    (0, _forEach3.default)(checkers, function (checker) {
      test = check[checker]() === checkee[checker]();
      return test;
    });

    return test;
  };

  var _forEach3 = _interopRequireDefault(_forEach2);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  var checkers = ['getDate', 'getMonth', 'getFullYear'];

  ;
  module.exports = exports['default'];
});