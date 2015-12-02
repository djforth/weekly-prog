const _       = require("lodash")
    , checker = require("../utils/day_checker")
    , SessionsFcty = require("./sessions_fcty")

function getDate(dates, date){
  return _.find(dates, (d)=>{
   return checker(d.date, date);
  });
}


function checkDates (dates, date){

  return (getDate(dates, date)) ? true : false;
}

function createFactory(groupBy){
  return function(data){
    let fcty = new SessionsFcty({}, data);
    fcty.setTimeKey(groupBy);

    return fcty;
  }
}

function createFirstWeek(createFcty){
  var start = new Date();
  var week  = [{
      date:start
    , data:createFcty([])
  }];
  var i     = 1;

  do{
    start = _.clone(start);
    start.setDate(start.getDate()+1);
    week.push({
        date:start
      , data:createFcty()
    });

    i++;
  } while(i < 7);

  return week;
}


function dateUpdate(dates, date, data){
  return _.map(dates, (d)=>{
    if(checker(d.date, date)){
      d.data = data;
    }
    return d
  });
}



function dateManager(groupBy, ds){
  let fctyCreator = createFactory(groupBy);

  let dates = (_.isArray(ds)) ? ds : createFirstWeek(fctyCreator);
  return {
    addDate:(date, data)=>{
      if(!_.isDate(date)) return false;
      let fcty = fctyCreator(data);
      if(checkDates(dates,date)){
        let fn = _.partial(dateUpdate, dates);
        dates = fn(date, fcty)
      } else {
        dates.push({date:date, data:fcty})
      }
    }

    , findDate:(...args)=>{
        let fn = _.partial(getDate, dates);
        return fn.apply(this, args)

      }

    , getAll:()=>dates

    , getAllDates:()=>_.pluck(dates, "date")

    // , getRange:(st, fn)=>{
    //   return _.filter(dates,
    // }

    , updateDate:(...args)=>{
      let fn = _.partial(dateUpdate, dates);
      dates = fn.apply(this, args)
    }
  }
}

module.exports = dateManager;