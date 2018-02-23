import checker from '../utils/day_checker';
import SessionsFcty from './sessions_fcty';
// lodash

import _, {partial} from 'lodash';
import Moment from 'moment';

function getDate(dates, date){
  return _.find(dates, (d)=>checker(d.date, date));
}

/*eslint-disable*/
function checkDates (dates, date){
  return (getDate(dates, date)) ? true : false;
}
/* eslint-enable*/

function createFactory(groupBy){
  return function(data){
    let fcty = new SessionsFcty({}, data);
    fcty.setTimeKey(groupBy);

    return fcty;
  };
}

function createWeek(createFcty, start = new Date()){
  // var start = new Date();
  let week  = [{
    date: start
    , data: createFcty([])
  }];
  let i = 1;

  do {
    start = new Date(start.getTime());
    start.setDate(start.getDate() + 1);
    week.push({
      date: start
      , data: createFcty()
      , fetched: false
    });

    i++;
  } while (i < 7);

  return week;
}

function dateUpdate(dates, date, data){
  return _.map(dates, (d)=>{
    if (checker(d.date, date)){
      // console.log(d.data.size(), data.length)
      d.data.add(data);
      // console.log(d.data.size(), data.length)
      d.fetched = true;
    }
    return d;
  });
}

function getNewDate(date, n = 1){
  let create_date = new Date(date);
  create_date.setDate(create_date.getDate() + n);
  return create_date;
}

function processForNav(dm){
  let dateFmt = Moment(dm.date);

  // if (dm.data.size() === 0) console.log('dm', dm)
  return {
    date: dm.date
    , fmt: dateFmt
    , title: dateFmt.format('ddd Do')
    , alt: dateFmt.format('dddd, MMMM Do YYYY')
    , today: checker(dm.date, new Date())
    , nosessions: (dm.data.size() === 0 && !dm.fetched)
  };
}

function resetDates(dates){
  return _.filter(dates, (dm)=>checker(dm.date, new Date()));
}

function earliestDate(dates){
  return _.reduce(dates, (prev, curr)=>{
    if (prev.date.getTime() > curr.date.getTime()){
      return curr;
    }

    return prev;
  });
}

function dateManager(groupBy, ds){
  let fctyCreator = createFactory(groupBy);
  let weekCreator = partial(createWeek, fctyCreator);
  let dates = (_.isArray(ds)) ? ds : weekCreator();

  return {
    addDate: (date, data)=>{
      if (!_.isDate(date)) return false;

      if (checkDates(dates, date)){
        let fn = partial(dateUpdate, dates);
        dates = fn(date, data);
      } else {
        let fcty = fctyCreator(data);
        dates.push({date: date, data: fcty, fetched: true});
      }
    }

    , createWeek: weekCreator

    , findDate: (...args)=>{
      let fn = partial(getDate, dates);
      return fn.apply(this, args);
    }

    , getAll: ()=>dates

    , getAllDates: ()=>{
      // let today = new Date();

      dates = dates.sort((a, b)=>{
        if (a.date.getTime() > b.date.getTime()) return 1;
        if (a.date.getTime() < b.date.getTime()) return -1;
        return 0;
      });
      return _.map(dates, (dm)=>processForNav(dm));
    }
    // Should refactor this ADE
    , getMoreDays(){
      let fetch_date = _.find(dates, (dm)=>{
        return dm.data.size() === 0 && !dm.fetched;
      });
      if (fetch_date) return fetch_date.date;

      let newDates = weekCreator(getNewDate(_.last(dates).date));
      dates = dates.concat(newDates);

      return earliestDate(newDates).date;
    }

    , getPreviousDays(date){
      let newDates = weekCreator(getNewDate(date, -7));
      dates = dates.concat(newDates);
      return earliestDate(newDates).date;
    }

    , resetDates(){
      dates = resetDates(dates);
    }

    , updateDate: (...args)=>{
      let fn = partial(dateUpdate, dates);
      dates = fn.apply(this, args);
    }
  };
}

export default dateManager;
