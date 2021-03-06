(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['module', 'exports', 'flux'], factory);
  } else if (typeof exports !== "undefined") {
    factory(module, exports, require('flux'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod, mod.exports, global.flux);
    global.sessions_dispatcher = mod.exports;
  }
})(this, function (module, exports, _flux) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Object.assign(new _flux.Dispatcher(), {
    changeDate: function changeDate(action) {
      var payload = {
        source: 'CHANGE_DATE',
        action: action
      };
      this.dispatch(payload);
    },

    calendarChange: function calendarChange(action) {
      var payload = {
        source: 'CALENDAR_CHANGE',
        action: action
      };
      this.dispatch(payload);
    },

    fetchData: function fetchData(action) {
      var payload = {
        source: 'FETCH_DATA',
        action: action
      };
      this.dispatch(payload);
    },

    fetchNowNext: function fetchNowNext(action) {
      var payload = {
        source: 'FETCH_NOWNEXT',
        action: action
      };
      this.dispatch(payload);
    },

    getMoreDays: function getMoreDays(action) {
      var payload = {
        source: 'MORE_DAYS',
        action: action
      };
      this.dispatch(payload);
    },

    getPreviousDays: function getPreviousDays(action) {
      var payload = {
        source: 'PREVIOUS_DAYS',
        action: action
      };
      this.dispatch(payload);
    },

    prerenderData: function prerenderData(action) {
      var payload = {
        source: 'PRERENDER_DATA',
        action: action
      };
      this.dispatch(payload);
    },

    setApi: function setApi(action) {
      var payload = {
        source: 'SET_API',
        action: action
      };
      this.dispatch(payload);
    },

    setFacility: function setFacility(action) {
      var payload = {
        source: 'SET_FACILITY',
        action: action
      };
      this.dispatch(payload);
    },

    setGroupBy: function setGroupBy(action) {
      var payload = {
        source: 'SET_GROUPBY',
        action: action
      };
      this.dispatch(payload);
    }
  });
  module.exports = exports['default'];
});