"use strict";

var SessionsDispatcher = require("../dispatchers/sessions_dispatcher");

module.exports = {

  fetchData: function fetchData(progress, data) {
    SessionsDispatcher.fetchData({
      type: "FETCH_DATA",
      data: data,
      progress: progress
    });
  },

  setGroupby: function setGroupby(groupBy) {
    SessionsDispatcher.setGroupBy({
      type: "SET_GROUPBY",
      groupBy: groupBy
    });
  },

  prerenderData: function prerenderData(data) {
    SessionsDispatcher.prerenderData({
      type: "PRERENDER_DATA",
      data: data
    });
  }
};
//# sourceMappingURL=sessions_actions.js.map