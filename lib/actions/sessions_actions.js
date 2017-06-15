(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['module', 'exports', '../dispatchers/sessions_dispatcher'], factory);
  } else if (typeof exports !== "undefined") {
    factory(module, exports, require('../dispatchers/sessions_dispatcher'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod, mod.exports, global.sessions_dispatcher);
    global.sessions_actions = mod.exports;
  }
})(this, function (module, exports, _sessions_dispatcher) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _sessions_dispatcher2 = _interopRequireDefault(_sessions_dispatcher);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  /**
    * This will change current date in sessions store
    * @type {function}
    * @param {date} date (required).
    * @return {} returns nothing
    */

  function changeDate(date) {
    _sessions_dispatcher2.default.changeDate({
      type: 'CHANGE_DATE',
      date: date
    });
  }

  /**
    * This will change current date in sessions store from calendar
    * @type {function}
    * @param {date} date (required).
    * @return {} returns nothing
    */

  /**
  * Weekly programme module.
  * @module  weekly-prog/actions/sessions_actions
  */

  function calendarChange(date) {
    _sessions_dispatcher2.default.calendarChange({
      type: 'CALENDAR_CHANGE',
      date: date
    });
  }

  /**
    * Will fetch data
    * @type {function}
    * @param {progress} function - tracks loading.
    * @param {date} date, to add to query string.
    * @return {} returns nothing
    */
  function fetchData(progress, date) {
    _sessions_dispatcher2.default.fetchData({
      type: 'FETCH_DATA',
      progress: progress,
      date: date
    });
  }

  /**
    * Will fetch now/next data
    * @type {function}
    * @param {progress} function - tracks loading.
    * @return {} returns nothing
    */
  function fetchNowNext(progress) {
    _sessions_dispatcher2.default.fetchNowNext({
      type: 'FETCH_NOWNEXT',
      progress: progress
    });
  }

  /**
    * Will get the following days data
    * @type {function}
    * @return {} returns nothing
    */
  function getMoreDays() {
    _sessions_dispatcher2.default.getMoreDays({
      type: 'MORE_DAYS'
    });
  }

  /**
    * Will get the previous days data
    * @type {function}
    * @return {} returns nothing
    */
  function getPreviousDays(date) {
    _sessions_dispatcher2.default.getPreviousDays({
      type: 'PREVIOUS_DAYS',
      date: date
    });
  }

  /**
    * Will add prerender data to store
    * @type {function}
    * @param {data} array
    * @return {} returns nothing
    */
  function prerenderData(data) {
    _sessions_dispatcher2.default.prerenderData({
      type: 'PRERENDER_DATA',
      data: data
    });
  }

  /**
    * Will set api
    * @type {function}
    * @param {string} url for api call
    * @return {} returns nothing
    */
  function setApi(url) {
    _sessions_dispatcher2.default.setApi({
      type: 'SET_API',
      url: url
    });
  }

  /**
    * Will set facility in store (for now/next)
    * @type {function}
    * @param {number} id of facility
    * @return {} returns nothing
    */
  function setFacility(id) {
    _sessions_dispatcher2.default.setFacility({
      type: 'SET_FACILITY',
      id: id
    });
  }

  /**
    * Will set groupby in store
    * @type {function}
    * @param {string} key
    * @return {} returns nothing
    */
  function setGroupby(groupBy) {
    _sessions_dispatcher2.default.setGroupBy({
      type: 'SET_GROUPBY',
      groupBy: groupBy
    });
  }

  exports.default = {
    changeDate: changeDate,
    calendarChange: calendarChange,
    fetchData: fetchData,
    fetchNowNext: fetchNowNext,
    getMoreDays: getMoreDays,
    getPreviousDays: getPreviousDays,
    prerenderData: prerenderData,
    setApi: setApi,
    setFacility: setFacility,
    setGroupby: setGroupby
  };
  module.exports = exports['default'];
});