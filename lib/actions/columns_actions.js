(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['module', 'exports', '../dispatchers/columns_dispatcher'], factory);
  } else if (typeof exports !== "undefined") {
    factory(module, exports, require('../dispatchers/columns_dispatcher'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod, mod.exports, global.columns_dispatcher);
    global.columns_actions = mod.exports;
  }
})(this, function (module, exports, _columns_dispatcher) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _columns_dispatcher2 = _interopRequireDefault(_columns_dispatcher);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  /**
    * This will add column to store
    * @type {function}
    * @param {array} Columns (required).
    * @return {} returns nothing
    */

  function addingColumns(cols) {
    _columns_dispatcher2.default.handleAddingColumns({
      type: 'ADDING_COLUMNS',
      columns: cols
    });
  }

  /**
    * This will change device in store
    * @type {function}
    * @param {string} Device (required). Expected desktop|tablet|mobile
    * @return {} returns nothing
    */

  /**
   * Weekly programme module.
   * @module weekly-prog/actions/columns_actions
  */

  function changeDevice(device) {
    _columns_dispatcher2.default.handleChangeDevice({
      type: 'CHANGE_DEVICE',
      device: device
    });
  }

  exports.default = {
    addingColumns: addingColumns,
    changeDevice: changeDevice
  };
  module.exports = exports['default'];
});