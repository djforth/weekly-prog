const assign      = require("react/lib/Object.assign")
  , EventEmitter  = require("events").EventEmitter
  , _             = require("lodash");

//Internal Modules
const AjaxManager  = require("../utils/ajax_manager")
    , DateManager  = require("../factories/date_manager")
    , SessionsFcty = require("../factories/sessions_fcty")
    , Breaker      = require("../utils/sessions_breaker");


//Flux
const SessionsDispatcher = require("../dispatchers/sessions_dispatcher")
    , SessionsAction     = require("../actions/sessions_actions");

let ajaxManager, processor, sessions;

let fetched = false;

function processData(groupBy){
  let sessions = DateManager(groupBy);
  // console.log('groupBy', groupBy);
  return function(d){
    let groups = Breaker(d, groupBy);
    _.forEach(_.values(groups), (ses)=>{
      sessions.addDate(ses.date, ses.sessions);
    });

    return sessions
  };
}

function currentDate(date){
  let current = (_.isDate(date)) ? date : new Date();

  return {
      getDate:()=>current
    , setDate:(d)=>{
      current = (_.isDate(d)) ? d : current;
    }
  }
}

const store = {
  // <<<<<<<<<<<<<<<< Event management >>>>>>>>>>
  emitChange(event) {
    this.emit(event);
  }

  , addChangeListener(event, callback) {
    this.on(event, callback);
  }

  , removeChangeListener(event, callback) {
    this.removeListener(event, callback);
  }

  // <<<<<<<<<<<<<<< Fetching and processing session >>>>>>>>>>>>
  , _addSessions(data){
    sessions = processor(data);
  }

  , _fetchData(date){

    if(!ajaxManager){
      throw new Error("please set API path")
    }
    ajaxManager.setQuery(date);
    return ajaxManager.fetch().then((data)=>{
      fetched = true;
      sessions = processor(data);
      this.emitChange("fetched");
    })
  }

  , _getDate(date){
    if(!this.current){
      this.current = currentDate(date);
    }
    this.current.setDate(date);
    if(sessions){
      let current_day = sessions.findDate(this.current.getDate());
      if(current_day) return current_day;
    }

    if(fetched){
      this._fetchData(this.current.getDate());
      this.emitChange("fetching");
    } else {
      return []
    }


    return null;
  }

  , _getTimePeriod(date, tp){
    //
  }

  , _setApi(api){
    ajaxManager = AjaxManager(api);
  }

  , _setDate(date){
    if(!this.current){
      this.current = currentDate(date);
    }
    this.current.setDate(date);
  }

  , _setTimePeriods(){

  }

  , _setGroups(groupBy){
    // console.log(groupBy)
    processor = processData(groupBy);
  }
};

const SessionStore = assign({}, EventEmitter.prototype, store);
SessionStore.setMaxListeners(0);

const registeredCallback = function(payload) {
  var action = payload.action;
  // console.log(action.type)
  switch(action.type) {
    case "CHANGE_DAY":

      break;
    case "GET_TIMEPERIOD":

      break;
    case "FETCH_DATA":

      break;
    case "PRERENDER_DATA":
      SessionStore._addSessions(action.data);
      SessionStore.emitChange("prerender");
      break;
    case "SET_GROUPBY":
      // console.log(action.groupBy)
      SessionStore._setGroups(action.groupBy);
      SessionStore.emitChange("groupby");
      break;

  }
};

SessionStore.dispatchToken = SessionsDispatcher.register(registeredCallback);

module.exports = SessionStore;