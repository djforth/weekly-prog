const SessionsAction = require("../../src/actions/sessions_actions");


const actionHelper = require("react-jasmine").checkActions;

let date = new Date()

describe("SessionsAction", function() {

  let options = [
    {
      action:"fetchData",
      handler:"fetchData",
      args:["foo", date],
      dispactchArgs:{
        type     : "FETCH_DATA",
        progress : "foo",
        date     : date
      }
    },
    {
      action:"prerenderData",
      handler:"prerenderData",
      args:["foo"],
      dispactchArgs:{
        type   : "PRERENDER_DATA",
        data   : "foo"
      }
    },
    {
      action:"setApi",
      handler:"setApi",
      args:["foo"],
      dispactchArgs:{
        type   : "SET_API",
        url   : "foo"
      }
    },
    {
      action:"setGroupby",
      handler:"setGroupBy",
      args:["foo"],
      dispactchArgs:{
        type    : "SET_GROUPBY",
        groupBy : "foo"
      }
    }
  ];

  actionHelper(SessionsAction, "SessionsDispatcher", options);

});