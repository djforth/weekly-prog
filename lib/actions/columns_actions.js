"use strict";

var ColumnsDispatcher = require("../dispatchers/columns_dispatcher");

module.exports = {
  addingColumns: function addingColumns(cols) {
    ColumnsDispatcher.handleAddingColumns({
      type: "ADDING_COLUMNS",
      columns: cols
    });
  },

  changeDevice: function changeDevice(device) {
    ColumnsDispatcher.handleChangeDevice({
      type: "CHANGE_DEVICE",
      device: device
    });
  }
};