const Dispatcher = require("flux").Dispatcher;
const assign     = require("react/lib/Object.assign");

const SessionsDispatcher = assign(new Dispatcher(), {
  fetchData: function(action) {
    var payload = {
      source: "FETCH_DATA",
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

  , prerenderData: function(action) {
    var payload = {
      source: "PRERENDER_DATA",
      action: action
    };
    this.dispatch(payload);
  }
});

module.exports = SessionsDispatcher;