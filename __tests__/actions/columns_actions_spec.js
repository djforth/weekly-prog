import ColumnsAction from '../../src/actions/columns_actions';
import {checkActions as actionHelper} from '@djforth/react-jasmine-wp';

describe('ColumnsAction', function(){
  let options = [
    {
      action: 'addingColumns'
      , handler: 'handleAddingColumns'
      , args: ['foo']
      , dispactchArgs: {
        type: 'ADDING_COLUMNS'
        , columns: 'foo'
      }
    }
    , {
      action: 'changeDevice'
      , handler: 'handleChangeDevice'
      , args: ['foo']
      , dispactchArgs: {
        type: 'CHANGE_DEVICE'
        , device: 'foo'
      }
    }
  ];

  actionHelper(ColumnsAction, 'ColumnsDispatcher', options);
});
