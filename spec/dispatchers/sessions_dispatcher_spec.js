const SessionsDispatcher = require("../../src/dispatchers/sessions_dispatcher");

const dispatcherHelper = require("react-jasmine").checkDispatcher;


describe("SessionsDispatcher", function() {

  let options = [
    {
      handler:"fetchData",
      source:"FETCH_DATA"
    },
    {
      handler:"prerenderData",
      source:"PRERENDER_DATA"
    },
    {
      handler:"setApi",
      source:"SET_API"
    },
    {
      handler:"setGroupBy",
      source:"SET_GROUPBY"
    }
  ];

  dispatcherHelper(SessionsDispatcher, options);

});