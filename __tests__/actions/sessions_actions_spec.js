import SessionsAction from '../../src/actions/sessions_actions';


import {checkActions as actionHelper} from '@djforth/react-jasmine-wp';

let date = new Date();

describe('SessionsAction', function(){
  let options = [
    {
      action: 'changeDate'
      , handler: 'changeDate'
      , args: [date]
      , dispactchArgs: {
        type: 'CHANGE_DATE'
        , date: date
      }
    }
    , {
      action: 'calendarChange'
      , handler: 'calendarChange'
      , args: [date]
      , dispactchArgs: {
        type: 'CALENDAR_CHANGE'
        , date: date
      }
    }
    , {
      action: 'fetchData'
      , handler: 'fetchData'
      , args: ['foo', date]
      , dispactchArgs: {
        type: 'FETCH_DATA'
        , progress: 'foo'
        , date: date
      }
    }
    , {
      action: 'fetchData'
      , handler: 'fetchData'
      , args: ['foo', date]
      , dispactchArgs: {
        type: 'FETCH_DATA'
        , progress: 'foo'
        , date: date
      }
    }
    , {
      action: 'prerenderData'
      , handler: 'prerenderData'
      , args: ['foo']
      , dispactchArgs: {
        type: 'PRERENDER_DATA'
        , data: 'foo'
      }
    }
    , {
      action: 'setApi'
      , handler: 'setApi'
      , args: ['foo']
      , dispactchArgs: {
        type: 'SET_API'
        , url: 'foo'
      }
    }
    , {
      action: 'setGroupby'
      , handler: 'setGroupBy'
      , args: ['foo']
      , dispactchArgs: {
        type: 'SET_GROUPBY'
        , groupBy: 'foo'
      }
    }
  ];

  actionHelper(SessionsAction, 'SessionsDispatcher', options);
});
