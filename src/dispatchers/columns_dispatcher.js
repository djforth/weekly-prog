const Dispatcher = require('flux').Dispatcher;

const ColumnsDispatcher = Object.assign(new Dispatcher(), {
  handleAddingColumns: function(action){
    var payload = {
      source: 'ADDING_COLUMNS'
      , action: action
    };
    this.dispatch(payload);
  }

  , handleChangeDevice: function(action){
    var payload = {
      source: 'CHANGE_DEVICE'
      , action: action
    };
    this.dispatch(payload);
  }
});

module.exports = ColumnsDispatcher;
