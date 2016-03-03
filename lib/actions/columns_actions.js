"use strict";

/**
 * Weekly programme module.
 * @module weekly-prog/actions/columns_actions
*/

var ColumnsDispatcher = require("../dispatchers/columns_dispatcher");

/**
  * This will add column to store
  * @type {function}
  * @param {array} Columns (required).
  * @return {} returns nothing
  */

var addingColumns = function addingColumns(cols) {
  ColumnsDispatcher.handleAddingColumns({
    type: "ADDING_COLUMNS",
    columns: cols
  });
};

/**
  * This will change device in store
  * @type {function}
  * @param {string} Device (required). Expected desktop|tablet|mobile
  * @return {} returns nothing
  */

var changeDevice = function changeDevice(device) {
  ColumnsDispatcher.handleChangeDevice({
    type: "CHANGE_DEVICE",
    device: device
  });
};

module.exports = {
  addingColumns: addingColumns,
  changeDevice: changeDevice
};