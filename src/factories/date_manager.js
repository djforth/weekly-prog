const _       = require("lodash")
    , checker = require("../utils/day_checker")
    , SessionsFcty = require("./sessions_fcty")

function getDate(dates, date){
  return _.find(dates, (d)=>{
    return checker(d.date, date);
  })
}


function checkDates (dates, date){
  return (getDate(dates, date)) ? true : false;
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
  // console.log("length",ds.length)
  let dates = (_.isArray(ds)) ? ds : [];
  return {
    addDate:(date, data)=>{
      let fcty = new SessionsFcty({}, data);

      fcty.setTimeKey(groupBy);

      if(checkDates(date)){
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