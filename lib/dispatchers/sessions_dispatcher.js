"use strict";

var Dispatcher = require("flux").Dispatcher;
var assign = require("react/lib/Object.assign");

var SessionsDispatcher = assign(new Dispatcher(), {
  fetchData: function fetchData(action) {
    var payload = {
      source: "FETCH_DATA",
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
  },

  prerenderData: function prerenderData(action) {
    var payload = {
      source: "PRERENDER_DATA",
      action: action
    };
    this.dispatch(payload);
  }
});

module.exports = SessionsDispatcher;
//# sourceMappingURL=sessions_dispatcher.js.map