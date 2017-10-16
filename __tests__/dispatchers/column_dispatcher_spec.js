
import ColumnsDispatcher from '../../src/dispatchers/columns_dispatcher';

import {checkDispatcher as dispatcherHelper} from '@djforth/react-jasmine-wp';


describe('ColumnsDispatcher', function(){
  let options = [
    {
      handler: 'handleAddingColumns'
      , source: 'ADDING_COLUMNS'
    }
    , {
      handler: 'handleChangeDevice'
      , source: 'CHANGE_DEVICE'
    }
  ];

  dispatcherHelper(ColumnsDispatcher, options);
});
