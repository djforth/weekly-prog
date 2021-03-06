/**
 * Weekly programme module.
 * @module weekly-prog/actions/columns_actions
*/


import ColumnsDispatcher from '../dispatchers/columns_dispatcher';

/**
  * This will add column to store
  * @type {function}
  * @param {array} Columns (required).
  * @return {} returns nothing
  */

function addingColumns(cols){
  ColumnsDispatcher.handleAddingColumns({
    type: 'ADDING_COLUMNS'
    , columns: cols
  });
}

/**
  * This will change device in store
  * @type {function}
  * @param {string} Device (required). Expected desktop|tablet|mobile
  * @return {} returns nothing
  */

function changeDevice(device){
  ColumnsDispatcher.handleChangeDevice({
    type: 'CHANGE_DEVICE'
    , device: device
  });
}

export default {
  addingColumns: addingColumns
  , changeDevice: changeDevice
};
