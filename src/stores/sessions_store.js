const assign      = require("react/lib/Object.assign")
  , EventEmitter  = require("events").EventEmitter
  , _             = require("lodash")
  , DateFormatter = require("date-formatter");

//Internal Modules
const AjaxManager  = require("../utils/ajax_manager")
    , DateManager  = require("../factories/date_manager")
    , SessionsFcty = require("../factories/sessions_fcty")
    , Breaker      = require("../utils/sessions_breaker")
    , checker      = require("../utils/day_checker");


//Flux
const SessionsDispatcher = require("../dispatchers/sessions_dispatcher")
    , SessionsAction     = require("../actions/sessions_actions");

let ajaxManager, processor, sessions;

let fetched = false;

function processData(groupBy){

  let sessions = DateManager(groupBy);

  return function(d){

    let groups = Breaker(d, groupBy);
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

  // return _.map(dates, (d)=>{
  //   let dateFmt = new DateFormatter(d);

  //   return {
  //       date:d
  //     , fmt:dateFmt
  //     , title:dateFmt.formatDate("%a %d")
  //     , alt:dateFmt.formatDate("%A, %d %B %Y")
  //     , today: checker(d, new Date())
  //   }
  // });
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

  , _fetchData(progress, date){

    if(!ajaxManager){
      throw new Error("please set API path")
    }
    ajaxManager.addQuery(date);
    return ajaxManager.fetch(progress).then((data)=>{
      fetched = true;
      sessions = processor(data);
      this.emitChange("fetched");
      return sessions.getAllDates()
    }).then(this._fetchRest.bind(this))
  }

  , _fetchRest(dates){
      let fetch = _.filter(dates, (d)=>d.nosessions)
      fetch = _.reduce(fetch, (prev, curr)=>{
        if(prev.date.getTime() > curr.date.getTime()){
          return curr;
        }

        return prev;
      });
      console.log(fetch)
      if(fetch) this._fetchData(null, fetch.date)
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

  , _getMoreDays(){
    if(fetched){
      let date = sessions.getMoreDays();
      console.log("date", date)
      if(_.isDate(date)) this._fetchData(null, date)
    }
  }

  , _getAllDates(){
    // console.log(sessions.getAllDates())
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

  , _setGroups(groupBy){
    if(_.isString(groupBy)){
      processor = processData(groupBy);
    }

  }
};

const SessionStore = assign({}, EventEmitter.prototype, store);
SessionStore.setMaxListeners(0);

const registeredCallback = function(payload) {
  var action = payload.action;
  // console.log(action.type)
  switch(action.type) {
    case "CHANGE_DATE":
      SessionStore._setDate(action.date);
      SessionStore.emitChange("changing_date");
      break;
    // case "GET_TIMEPERIOD":

    //   break;
    case "FETCH_DATA":
      SessionStore._fetchData(action.progress, action.date);
      SessionStore.emitChange("fetching");
      break;

    case "MORE_DAYS":
      SessionStore._getMoreDays();
      SessionStore.emitChange("more_days");
      break;
    case "PRERENDER_DATA":
      SessionStore._addSessions(action.data);
      SessionStore.emitChange("prerender");
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