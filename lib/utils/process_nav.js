(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['module', 'exports', 'lodash/clone', 'lodash/map'], factory);
  } else if (typeof exports !== "undefined") {
    factory(module, exports, require('lodash/clone'), require('lodash/map'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod, mod.exports, global.clone, global.map);
    global.process_nav = mod.exports;
  }
})(this, function (module, exports, _clone2, _map2) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  exports.default = function (items) {
    var txt = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'Sessions for ';

    return (0, _map3.default)(items, function (item, i) {
      item.name = (0, _clone3.default)(item.title);
      item.title = txt + ' ' + item.name;
      item.active = i === 0;
      return item;
    });
  };

  var _clone3 = _interopRequireDefault(_clone2);

  var _map3 = _interopRequireDefault(_map2);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  ;
  module.exports = exports['default'];
});