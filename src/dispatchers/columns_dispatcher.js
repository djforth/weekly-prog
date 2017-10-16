import {Dispatcher} from 'flux';

const ColumnsDispatcher = Object.assign(new Dispatcher(), {
  handleAddingColumns: function(action){
    let payload = {
      source: 'ADDING_COLUMNS'
      , action: action
    };
    this.dispatch(payload);
  }

  , handleChangeDevice: function(action){
    let payload = {
      source: 'CHANGE_DEVICE'
      , action: action
    };
    this.dispatch(payload);
  }
});

export default ColumnsDispatcher;
