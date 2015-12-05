"use strict";

var assign = require("react/lib/Object.assign"),
    EventEmitter = require("events").EventEmitter,
    _ = require("lodash"),
    DateFormatter = require("date-formatter");

//Internal Modules
var AjaxManager = require("../utils/ajax_manager"),
    DateManager = require("../factories/date_manager"),
    SessionsFcty = require("../factories/sessions_fcty"),
    Breaker = require("../utils/sessions_breaker"),
    checker = require("../utils/day_checker");

//Flux
var SessionsDispatcher = require("../dispatchers/sessions_dispatcher"),
    SessionsAction = require("../actions/sessions_actions");

var ajaxManager = undefined,
    processor = undefined,
    sessions = undefined;

var fetched = false;

function processData(groupBy) {

  var sessions = DateManager(groupBy);

  return function (d) {

    var groups = Breaker(d, groupBy);
    _.forEach(_.values(groups), function (ses) {
      sessions.addDate(ses.date, ses.sessions);
    });

    return sessions;
  };
}

function processDates(dates) {
  var yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  return _.filter(dates, function (d) {
    return d.date.getTime() >= yesterday.getTime();
  });

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

function currentDate(date) {
  var current = _.isDate(date) ? date : new Date();

  return {
    getDate: function getDate() {
      return current;
    },
    setDate: function setDate(d) {
      current = _.isDate(d) ? d : current;
    }
  };
}

var store = {
  // <<<<<<<<<<<<<<<< Event management >>>>>>>>>>

  emitChange: function emitChange(event) {
    this.emit(event);
  },
  addChangeListener: function addChangeListener(event, callback) {
    this.on(event, callback);
  },
  removeChangeListener: function removeChangeListener(event, callback) {
    this.removeListener(event, callback);
  }

  // <<<<<<<<<<<<<<< Fetching and processing session >>>>>>>>>>>>
  ,
  _addSessions: function _addSessions(data) {
    sessions = processor(data);
  },
  _fetchData: function _fetchData(progress, date) {
    var _this = this;

    if (!ajaxManager) {
      throw new Error("please set API path");
    }
    ajaxManager.addQuery(date);
    return ajaxManager.fetch(progress).then(function (data) {
      fetched = true;
      sessions = processor(data);
      _this.emitChange("fetched");
      return sessions.getAllDates();
    }).then(this._fetchRest.bind(this));
  },
  _fetchRest: function _fetchRest(dates) {
    var fetch = _.filter(dates, function (d) {
      return d.nosessions;
    });
    fetch = _.reduce(fetch, function (prev, curr) {
      if (prev.date.getTime() > curr.date.getTime()) {
        return curr;
      }

      return prev;
    });
    console.log(fetch);
    if (fetch) this._fetchData(null, fetch.date);
  },
  _getDate: function _getDate(date) {
    if (!this.current) {
      this.current = currentDate(date);
    }
    this.current.setDate(date);
    if (sessions) {
      var current_day = sessions.findDate(this.current.getDate());
      if (current_day) return current_day;
    }

    if (fetched) {
      this._fetchData(this.current.getDate());
      this.emitChange("fetching");
    } else {
      return [];
    }

    return null;
  },
  _getMoreDays: function _getMoreDays() {
    if (fetched) {
      var date = sessions.getMoreDays();
      console.log("date", date);
      if (_.isDate(date)) this._fetchData(null, date);
    }
  },
  _getAllDates: function _getAllDates() {
    // console.log(sessions.getAllDates())
    return processDates(sessions.getAllDates());
  },
  _setApi: function _setApi(api) {
    ajaxManager = AjaxManager(api);
  },
  _setDate: function _setDate(date) {
    if (!this.current) {
      this.current = currentDate(date);
    }
    this.current.setDate(date);
  },
  _setGroups: function _setGroups(groupBy) {
    if (_.isString(groupBy)) {
      processor = processData(groupBy);
    }
  }
};

var SessionStore = assign({}, EventEmitter.prototype, store);
SessionStore.setMaxListeners(0);

var registeredCallback = function registeredCallback(payload) {
  var action = payload.action;
  // console.log(action.type)
  switch (action.type) {
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
//# sourceMappingURL=sessions_store.js.map