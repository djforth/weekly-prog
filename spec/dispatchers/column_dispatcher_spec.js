
const ColumnsDispatcher = require("../../src/dispatchers/columns_dispatcher");

const dispatcherHelper = require("react-jasmine").checkDispatcher;


describe("handleAddToColumns", function() {

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