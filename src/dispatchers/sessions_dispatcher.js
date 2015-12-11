const Dispatcher = require("flux").Dispatcher;
const assign     = require("react/lib/Object.assign");

const SessionsDispatcher = assign(new Dispatcher(), {
  changeDate: function(action) {
    var payload = {
      source: "CHANGE_DATE",
      action: action
    };
    this.dispatch(payload);
  }

  , calendarChange: function(action) {
    var payload = {
      source: "CALENDAR_CHANGE",
      action: action
    };
    this.dispatch(payload);
  }

  , fetchData: function(action) {
    var payload = {
      source: "FETCH_DATA",
      action: action
    };
    this.dispatch(payload);
  }

  , fetchNowNext: function(action) {
    var payload = {
      source: "FETCH_NOWNEXT",
      action: action
    };
    this.dispatch(payload);
  }

  , getMoreDays: function(action) {
    var payload = {
      source: "MORE_DAYS",
      action: action
    };
    this.dispatch(payload);
  }

  , getPreviousDays: function(action) {
    var payload = {
      source: "PREVIOUS_DAYS",
      action: action
    };
    this.dispatch(payload);
  }

  , prerenderData: function(action) {
    var payload = {
      source: "PRERENDER_DATA",
      action: action
    };
    this.dispatch(payload);
  }

  , setApi: function(action) {
    var payload = {
      source: "SET_API",
      action: action
    };
    this.dispatch(payload);
  }

  , setFacility: function(action) {
    var payload = {
      source: "SET_FACILITY",
      action: action
    };
    this.dispatch(payload);
  }

  , setGroupBy: function(action) {
    var payload = {
      source: "SET_GROUPBY",
      action: action
    };
    this.dispatch(payload);
  }
});

module.exports = SessionsDispatcher;