import {Dispatcher as Dispatcher} from 'flux';

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

export default ColumnsDispatcher;
