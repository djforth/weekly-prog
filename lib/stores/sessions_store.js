"use strict";

var assign = require("react/lib/Object.assign"),
    EventEmitter = require("events").EventEmitter,
    _ = require("lodash");

//Internal Modules
var AjaxManager = require("../utils/ajax_manager"),
    DateManager = require("../factories/date_manager"),
    SessionsFcty = require("../factories/sessions_fcty"),
    Breaker = require("../utils/sessions_breaker");

//Flux
var SessionsDispatcher = require("../dispatchers/sessions_dispatcher"),
    SessionsAction = require("../actions/sessions_actions");

var ajaxManager = undefined,
    processor = undefined,
    sessions = undefined;

function processData(groupBy) {
  var sessions = DateManager(groupBy);
  // console.log('groupBy', groupBy);
  return function (d) {
    var groups = Breaker(d, groupBy);
    _.forEach(_.values(groups), function (ses) {
      sessions.addDate(ses.date, ses.sessions);
    });

    return sessions;
  };
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
  _fetchData: function _fetchData(date) {
    var _this = this;

    if (!ajaxManager) {
      throw new Error("please set API path");
    }
    ajaxManager.setQuery(date);
    return ajaxManager.fetch().then(function (data) {
      sessions = processor(data);
      _this.emitChange("fetched");
    });
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

    this._fetchData(this.current.getDate());
    this.emitChange("fetching");

    return null;
  },
  _getTimePeriod: function _getTimePeriod(date, tp) {
    //
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
  _setTimePeriods: function _setTimePeriods() {},
  _setGroups: function _setGroups(groupBy) {
    // console.log(groupBy)
    processor = processData(groupBy);
  }
};

var SessionStore = assign({}, EventEmitter.prototype, store);
SessionStore.setMaxListeners(0);

var registeredCallback = function registeredCallback(payload) {
  var action = payload.action;
  // console.log(action.type)
  switch (action.type) {
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
//# sourceMappingURL=sessions_store.js.map