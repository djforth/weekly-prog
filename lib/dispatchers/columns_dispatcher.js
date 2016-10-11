'use strict';

var Dispatcher = require('flux').Dispatcher;

var ColumnsDispatcher = Object.assign(new Dispatcher(), {
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

module.exports = ColumnsDispatcher;
;

var _temp = function () {
  if (typeof __REACT_HOT_LOADER__ === 'undefined') {
    return;
  }

  __REACT_HOT_LOADER__.register(Dispatcher, 'Dispatcher', 'src/dispatchers/columns_dispatcher.js');

  __REACT_HOT_LOADER__.register(ColumnsDispatcher, 'ColumnsDispatcher', 'src/dispatchers/columns_dispatcher.js');
}();

;