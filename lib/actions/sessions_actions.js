/**
* Weekly programme module.
* @module  weekly-prog/actions/sessions_actions
*/

import SessionsDispatcher from '../dispatchers/sessions_dispatcher';

/**
  * This will change current date in sessions store
  * @type {function}
  * @param {date} date (required).
  * @return {} returns nothing
  */

function changeDate(date) {
  SessionsDispatcher.changeDate({
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

function calendarChange(date) {
  SessionsDispatcher.calendarChange({
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
  SessionsDispatcher.fetchData({
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
  SessionsDispatcher.fetchNowNext({
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
  SessionsDispatcher.getMoreDays({
    type: 'MORE_DAYS'
  });
}

/**
  * Will get the previous days data
  * @type {function}
  * @return {} returns nothing
  */
function getPreviousDays(date) {
  SessionsDispatcher.getPreviousDays({
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
  SessionsDispatcher.prerenderData({
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
  SessionsDispatcher.setApi({
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
  SessionsDispatcher.setFacility({
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
  SessionsDispatcher.setGroupBy({
    type: 'SET_GROUPBY',
    groupBy: groupBy
  });
}

export default {
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
//# sourceMappingURL=sessions_actions.js.map