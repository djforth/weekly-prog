import Moment from 'moment-strftime';

import _ from 'lodash';

import checker from './day_checker';

function createKey(date){
  return `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`;
}

function groupSessions(sessions){
  let new_sessions = _.sortBy(sessions, (s)=>s.groupBy);
  let groups   = {};
  let ses      = _.first(new_sessions);
  if (_.isUndefined(ses) || _.isEmpty(ses)) return groups;
  let date     = _.first(new_sessions).groupBy;
  let key      = createKey(date);

  groups[key] = {date: date, sessions: []};
  _.forEach(new_sessions, (session)=>{
    if (checker(date, session.groupBy)){
      groups[key].sessions.push(session);
    } else {
      date = session.groupBy;
      key  = createKey(date);
      groups[key] = {date: date, sessions: [session]};
    }

    return groups;
  });

  return groups;
}

function makeDates(sessions, key){
  return _.map(sessions, (s)=>{
    let date     = Moment(s[key]);

    s.groupBy = date.toDate();

    return s;
  });
}

function addDay(groups, date){
  let key  = createKey(date.toDate());
  groups[key] = {date: date.clone().toDate(), sessions: []};

  return groups;
}

function currentDates(dates){
  dates = _.map(dates, (d)=>{
    return Moment(d);
  });

  return function(test){
    let check = false;
    _.forEach(dates, (d)=>{
      if (d.isSame(test, 'd')){
        check = true;
        return false;
      }
    });

    return check;
  };
}

function fillGaps(groups, start, end = 7){
  let dates = currentDates(_.map(_.values(groups), 'date'));
  start = (_.isUndefined(start)) ? _.first(dates) : start;
  start = Moment(start);
  end = start.clone().add(end, 'd');

  do {
    if (!dates(start)){
      groups = addDay(groups, start);
    }
    start.add(1, 'd');
  } while (start.isBefore(end));
  return groups;
}

export default function(sessions, groupBy, st){
  let list = makeDates(sessions, groupBy);
  let groups = groupSessions(list);
  return fillGaps(groups, st);
};
