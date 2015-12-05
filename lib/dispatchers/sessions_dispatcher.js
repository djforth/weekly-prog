"use strict";

var Dispatcher = require("flux").Dispatcher;
var assign = require("react/lib/Object.assign");

var SessionsDispatcher = assign(new Dispatcher(), {
  changeDate: function changeDate(action) {
    var payload = {
      source: "CHANGE_DATE",
      action: action
    };
    this.dispatch(payload);
  },

  fetchData: function fetchData(action) {
    var payload = {
      source: "FETCH_DATA",
      action: action
    };
    this.dispatch(payload);
  },

  getMoreDays: function getMoreDays(action) {
    var payload = {
      source: "MORE_DAYS",
      action: action
    };
    this.dispatch(payload);
  },

  prerenderData: function prerenderData(action) {
    var payload = {
      source: "PRERENDER_DATA",
      action: action
    };
    this.dispatch(payload);
  },

  setApi: function setApi(action) {
    var payload = {
      source: "SET_API",
      action: action
    };
    this.dispatch(payload);
  },

  setGroupBy: function setGroupBy(action) {
    var payload = {
      source: "SET_GROUPBY",
      action: action
    };
    this.dispatch(payload);
  }
});

module.exports = SessionsDispatcher;
//# sourceMappingURL=sessions_dispatcher.js.map