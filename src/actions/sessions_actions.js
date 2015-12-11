 const SessionsDispatcher = require("../dispatchers/sessions_dispatcher");

module.exports = {
  changeDate:(date)=>{
    SessionsDispatcher.changeDate({
      type: "CHANGE_DATE",
      date:date
    });
  }

  , calendarChange:(date)=>{
    SessionsDispatcher.calendarChange({
      type: "CALENDAR_CHANGE",
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

  , fetchNowNext:(progress)=>{
    SessionsDispatcher.fetchNowNext({
      type: "FETCH_NOWNEXT",
      progress:progress
    });
  }

  , getMoreDays(){
    SessionsDispatcher.getMoreDays({
      type: "MORE_DAYS"
    });
  }

  , getPreviousDays(date){
    SessionsDispatcher.getPreviousDays({
      type: "PREVIOUS_DAYS",
      date: date
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

  , setFacility:(id)=>{
    SessionsDispatcher.setFacility({
      type : "SET_FACILITY",
      id   : id
    });
  }

  , setGroupby:(groupBy)=>{
    SessionsDispatcher.setGroupBy({
      type: "SET_GROUPBY",
      groupBy: groupBy
    });
  }
}