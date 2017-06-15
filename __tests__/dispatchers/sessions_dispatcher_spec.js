import SessionsDispatcher from '../../src/dispatchers/sessions_dispatcher';
import {checkDispatcher as dispatcherHelper} from '@djforth/react-jasmine-wp';

console.log('dispatcherHelper', dispatcherHelper);

describe('SessionsDispatcher', function(){
  let options = [
    {
      handler: 'changeDate'
      , source: 'CHANGE_DATE'
    }
    , {
      handler: 'calendarChange'
      , source: 'CALENDAR_CHANGE'
    }
    , {
      handler: 'fetchData'
      , source: 'FETCH_DATA'
    }
    , {
      handler: 'getMoreDays'
      , source: 'MORE_DAYS'
    }
    , {
      handler: 'getPreviousDays'
      , source: 'PREVIOUS_DAYS'
    }
    , {
      handler: 'prerenderData'
      , source: 'PRERENDER_DATA'
    }
    , {
      handler: 'setApi'
      , source: 'SET_API'
    }
    , {
      handler: 'setGroupBy'
      , source: 'SET_GROUPBY'
    }
  ];

  dispatcherHelper(SessionsDispatcher, options);
});
