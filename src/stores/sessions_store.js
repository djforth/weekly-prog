const assign      = require("react/lib/Object.assign")
  , EventEmitter  = require("events").EventEmitter
  , _             = require("lodash");

//Internal Modules
const AjaxManager  = require("../utils/ajax_manager")
    , DateManager  = require("../factories/date_manager")
    , SessionsFcty = require("../factories/sessions_fcty")
    , Breaker      = require("../utils/sessions_breaker")
    , checker      = require("../utils/day_checker");


//Flux
const SessionsDispatcher = require("../dispatchers/sessions_dispatcher")
    , SessionsAction     = require("../actions/sessions_actions");

let ajaxManager, processor, sessions, facility;

let fetched     = false;
let requestMade = false;

function processData(groupBy){

  let sessions = DateManager(groupBy);

  return function(d, date, reset=false){
    if(reset) sessions.resetDates();

    let groups = Breaker(d, groupBy, date);
    _.forEach(_.values(groups), (ses)=>{
      sessions.addDate(ses.date, ses.sessions);
    });

    return sessions
  };
}

function processDates(dates){
  let yesterday = new Date();
  yesterday.setDate(yesterday.getDate()-1);
  return _.filter(dates, (d)=>{
    return d.date.getTime() >= yesterday.getTime();
  })
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
    if(_.isFunction(processor)){
      sessions = processor(data);
    }
  }

  , _calendarChange(date){
    this._setDate(date);
    this._fetchData(date, true);
  }

  , _fetchData(date, reset=false){
    if(!ajaxManager){
      throw new Error("please set API path")
    }

    ajaxManager.addQuery(date);
    let request = ajaxManager.fetch();

    if(request){
      return request.then((data)=>{
        fetched = true;
        sessions = processor(data, date, reset);

        this.emitChange("fetched");

        return sessions.getAllDates();
      })
      .then(this._fetchRest.bind(this));
    }
  }

  , _fetchNowNext(){
    let request = ajaxManager.fetch().then((data)=>{
        fetched = true;
        sessions = processor(data, false);

        this.emitChange("fetched");
      });
  }

  , _fetchRest(dates){
      let fetch = _.filter(dates, (d)=>d.nosessions)
      fetch = _.reduce(fetch, (prev, curr)=>{
        if(prev.date.getTime() > curr.date.getTime()){
          return curr;
        }

        return prev;
      });

      if(fetch) this._fetchData(fetch.date)
  }

  , _getCurrentDate(){
    return this.current.getDate()
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

  , _getFacility(){
    return sessions.findDate(new Date()).data.filter("facility", facility)
  }

  , _getMoreDays(){

    if(fetched){
      let date = sessions.getMoreDays();
      if(_.isDate(date)) this._fetchData(date)
    }
  }

  , _getPreviousDays(date){
    let d = sessions.getPreviousDays(date);
    if(_.isDate(d)){
      this._fetchData(d);
    }
  }

  , _getAllDates(){
    return processDates(sessions.getAllDates());
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

  , _setFacility(id){
    facility = id;
  }

  , _setGroups(groupBy){
    if(_.isString(groupBy)){
      processor = processData(groupBy);
    }
  }

  , _progress(prog){
    this.progress = prog
  }
};

const SessionStore = assign({}, EventEmitter.prototype, store);
SessionStore.setMaxListeners(0);

const registeredCallback = function(payload) {
  var action = payload.action;
  switch(action.type) {
    case "CHANGE_DATE":
      SessionStore._setDate(action.date);
      SessionStore.emitChange("changing_date");
      break;
    case "CALENDAR_CHANGE":
      SessionStore._calendarChange(action.date);
      SessionStore.emitChange("calendar_changing");
      break;
    case "FETCH_DATA":
      if(action.progress) SessionStore._progress(action.progress)
      SessionStore._fetchData(action.date);
      SessionStore.emitChange("fetching");
      break;

    case "FETCH_NOWNEXT":
      if(action.progress) SessionStore._progress(action.progress)
      SessionStore._fetchNowNext();
      SessionStore.emitChange("fetching_nownext");
      break;

    case "MORE_DAYS":
      SessionStore._getMoreDays();
      SessionStore.emitChange("more_days");
      break;

    case "PREVIOUS_DAYS":
      SessionStore._getPreviousDays(action.date);
      SessionStore.emitChange("previous_days");
      break;

    case "PRERENDER_DATA":
      SessionStore._addSessions(action.data);
      SessionStore.emitChange("prerender");
      break;

    case "SET_FACILITY":
      SessionStore._setFacility(action.id);
      SessionStore.emitChange("set_facility");
      break;

    case "SET_GROUPBY":
      SessionStore._setGroups(action.groupBy);
      SessionStore.emitChange("groupby");
      break;
    case "SET_API":
      SessionStore._setApi(action.url);
      SessionStore.emitChange("api_set");

      break;

  }
};

SessionStore.dispatchToken = SessionsDispatcher.register(registeredCallback);
SessionStore.setMaxListeners(0);

module.exports = SessionStore;