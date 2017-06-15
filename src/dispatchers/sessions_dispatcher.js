import {Dispatcher} from 'flux';

export default Object.assign(new Dispatcher(), {
  changeDate: function(action){
    let payload = {
      source: 'CHANGE_DATE'
      , action: action
    };
    this.dispatch(payload);
  }

  , calendarChange: function(action){
    let payload = {
      source: 'CALENDAR_CHANGE'
      , action: action
    };
    this.dispatch(payload);
  }

  , fetchData: function(action){
    let payload = {
      source: 'FETCH_DATA'
      , action: action
    };
    this.dispatch(payload);
  }

  , fetchNowNext: function(action){
    let payload = {
      source: 'FETCH_NOWNEXT'
      , action: action
    };
    this.dispatch(payload);
  }

  , getMoreDays: function(action){
    let payload = {
      source: 'MORE_DAYS'
      , action: action
    };
    this.dispatch(payload);
  }

  , getPreviousDays: function(action){
    let payload = {
      source: 'PREVIOUS_DAYS'
      , action: action
    };
    this.dispatch(payload);
  }

  , prerenderData: function(action){
    let payload = {
      source: 'PRERENDER_DATA'
      , action: action
    };
    this.dispatch(payload);
  }

  , setApi: function(action){
    let payload = {
      source: 'SET_API'
      , action: action
    };
    this.dispatch(payload);
  }

  , setFacility: function(action){
    let payload = {
      source: 'SET_FACILITY'
      , action: action
    };
    this.dispatch(payload);
  }

  , setGroupBy: function(action){
    let payload = {
      source: 'SET_GROUPBY'
      , action: action
    };
    this.dispatch(payload);
  }
});

// export default SessionsDispatcher;
