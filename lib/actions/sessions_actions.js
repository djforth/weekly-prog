"use strict";

var SessionsDispatcher = require("../dispatchers/sessions_dispatcher");

module.exports = {
  changeDate: function changeDate(date) {
    SessionsDispatcher.changeDate({
      type: "CHANGE_DATE",
      date: date
    });
  },

  fetchData: function fetchData(progress, date) {
    SessionsDispatcher.fetchData({
      type: "FETCH_DATA",
      progress: progress,
      date: date
    });
  },

  getMoreDays: function getMoreDays() {
    SessionsDispatcher.getMoreDays({
      type: "MORE_DAYS"
    });
  },
  prerenderData: function prerenderData(data) {
    SessionsDispatcher.prerenderData({
      type: "PRERENDER_DATA",
      data: data
    });
  },

  setApi: function setApi(url) {
    SessionsDispatcher.setApi({
      type: "SET_API",
      url: url
    });
  },

  setGroupby: function setGroupby(groupBy) {
    SessionsDispatcher.setGroupBy({
      type: "SET_GROUPBY",
      groupBy: groupBy
    });
  }
};
//# sourceMappingURL=sessions_actions.js.map