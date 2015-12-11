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
    sessions = undefined,
    facility = undefined;

var fetched = false;
var requestMade = false;

function processData(groupBy) {

  var sessions = DateManager(groupBy);

  return function (d) {
    var reset = arguments.length <= 1 || arguments[1] === undefined ? false : arguments[1];

    if (reset) sessions.resetDates();

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
    if (_.isFunction(processor)) {
      sessions = processor(data);
    }
  },
  _calendarChange: function _calendarChange(date) {
    this._setDate(date);
    this._fetchData(date, true);
  },
  _fetchData: function _fetchData(date) {
    var _this = this;

    var reset = arguments.length <= 1 || arguments[1] === undefined ? false : arguments[1];

    if (!ajaxManager) {
      throw new Error("please set API path");
    }

    ajaxManager.addQuery(date);
    var request = ajaxManager.fetch();

    if (request) {
      return request.then(function (data) {
        fetched = true;
        sessions = processor(data, reset);

        _this.emitChange("fetched");

        return sessions.getAllDates();
      }).then(this._fetchRest.bind(this));
    }
  },
  _fetchNowNext: function _fetchNowNext() {
    var _this2 = this;

    var request = ajaxManager.fetch().then(function (data) {
      fetched = true;
      sessions = processor(data, false);

      _this2.emitChange("fetched");
    });
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

    if (fetch) this._fetchData(fetch.date);
  },
  _getCurrentDate: function _getCurrentDate() {
    return this.current.getDate();
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
  _getFacility: function _getFacility() {
    return sessions.findDate(new Date()).data.filter("facility", facility);
  },
  _getMoreDays: function _getMoreDays() {

    if (fetched) {
      var date = sessions.getMoreDays();
      if (_.isDate(date)) this._fetchData(date);
    }
  },
  _getPreviousDays: function _getPreviousDays(date) {
    var d = sessions.getPreviousDays(date);
    if (_.isDate(d)) {
      this._fetchData(d);
    }
  },
  _getAllDates: function _getAllDates() {
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
  _setFacility: function _setFacility(id) {
    facility = id;
  },
  _setGroups: function _setGroups(groupBy) {
    if (_.isString(groupBy)) {
      processor = processData(groupBy);
    }
  },
  _progress: function _progress(prog) {
    this.progress = prog;
  }
};

var SessionStore = assign({}, EventEmitter.prototype, store);
SessionStore.setMaxListeners(0);

var registeredCallback = function registeredCallback(payload) {
  var action = payload.action;
  switch (action.type) {
    case "CHANGE_DATE":
      SessionStore._setDate(action.date);
      SessionStore.emitChange("changing_date");
      break;
    case "CALENDAR_CHANGE":
      SessionStore._calendarChange(action.date);
      SessionStore.emitChange("calendar_changing");
      break;
    case "FETCH_DATA":
      if (action.progress) SessionStore._progress(action.progress);
      SessionStore._fetchData(action.date);
      SessionStore.emitChange("fetching");
      break;

    case "FETCH_NOWNEXT":
      if (action.progress) SessionStore._progress(action.progress);
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
//# sourceMappingURL=sessions_store.js.map