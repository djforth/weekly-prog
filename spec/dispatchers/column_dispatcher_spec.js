
const ColumnsDispatcher = require("../../src/dispatchers/columns_dispatcher");

const dispatcherHelper = require('@djforth/react-jasmine-wp').checkDispatcher;


describe("ColumnsDispatcher", function() {

  let options = [
    {
      handler:"handleAddingColumns",
      source:"ADDING_COLUMNS"
    },
    {
      handler:"handleChangeDevice",
      source:"CHANGE_DEVICE"
    }
  ];

  dispatcherHelper(ColumnsDispatcher, options);

});