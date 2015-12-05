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

  , fetchData: function(action) {
    var payload = {
      source: "FETCH_DATA",
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

  , setGroupBy: function(action) {
    var payload = {
      source: "SET_GROUPBY",
      action: action
    };
    this.dispatch(payload);
  }
});

module.exports = SessionsDispatcher;