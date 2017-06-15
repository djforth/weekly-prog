(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['exports', 'flux'], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require('flux'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.flux);
    global.columns_dispatcher = mod.exports;
  }
})(this, function (exports, _flux) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });


  var ColumnsDispatcher = Object.assign(new _flux.Dispatcher(), {
    handleAddingColumns: function handleAddingColumns(action) {
      var payload = {
        source: 'ADDING_COLUMNS',
        action: action
      };
      this.dispatch(payload);
    },

    handleChangeDevice: function handleChangeDevice(action) {
      var payload = {
        source: 'CHANGE_DEVICE',
        action: action
      };
      this.dispatch(payload);
    }
  });

  exports.default = ColumnsDispatcher;
});