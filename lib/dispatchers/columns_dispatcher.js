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