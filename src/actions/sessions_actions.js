const SessionsDispatcher = require("../dispatchers/sessions_dispatcher");

module.exports = {

  fetchData:(progress, data)=>{
    SessionsDispatcher.fetchData({
      type: "FETCH_DATA",
      data:data,
      progress:progress
    });
  }

  , setGroupby:(groupBy)=>{
    SessionsDispatcher.setGroupBy({
      type: "SET_GROUPBY",
      groupBy: groupBy
    });
  }

  , prerenderData:(data)=>{
    SessionsDispatcher.prerenderData({
      type: "PRERENDER_DATA",
      data: data
    });
  }
}