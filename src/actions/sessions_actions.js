const SessionsDispatcher = require("../dispatchers/sessions_dispatcher");

module.exports = {

  changeDate:(date)=>{
    SessionsDispatcher.changeDate({
      type: "CHANGE_DATE",
      date:date
    });
  }


  , fetchData:(progress, date)=>{
    SessionsDispatcher.fetchData({
      type: "FETCH_DATA",
      progress:progress,
      date:date
    });
  }

  , prerenderData:(data)=>{
    SessionsDispatcher.prerenderData({
      type: "PRERENDER_DATA",
      data: data
    });
  }

  , setApi:(url)=>{
    SessionsDispatcher.setApi({
      type : "SET_API",
      url  : url
    });
  }

  , setGroupby:(groupBy)=>{
    SessionsDispatcher.setGroupBy({
      type: "SET_GROUPBY",
      groupBy: groupBy
    });
  }
}