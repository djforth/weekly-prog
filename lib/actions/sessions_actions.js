"use strict";

var SessionsDispatcher = require("../dispatchers/sessions_dispatcher");

module.exports = {
  changeDate: function changeDate(date) {
    SessionsDispatcher.changeDate({
      type: "CHANGE_DATE",
      date: date
    });
  },

  calendarChange: function calendarChange(date) {
    SessionsDispatcher.calendarChange({
      type: "CALENDAR_CHANGE",
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

  fetchNowNext: function fetchNowNext(progress) {
    SessionsDispatcher.fetchNowNext({
      type: "FETCH_NOWNEXT",
      progress: progress
    });
  },

  getMoreDays: function getMoreDays() {
    SessionsDispatcher.getMoreDays({
      type: "MORE_DAYS"
    });
  },
  getPreviousDays: function getPreviousDays(date) {
    SessionsDispatcher.getPreviousDays({
      type: "PREVIOUS_DAYS",
      date: date
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

  setFacility: function setFacility(id) {
    SessionsDispatcher.setFacility({
      type: "SET_FACILITY",
      id: id
    });
  },

  setGroupby: function setGroupby(groupBy) {
    SessionsDispatcher.setGroupBy({
      type: "SET_GROUPBY",
      groupBy: groupBy
    });
  }
};