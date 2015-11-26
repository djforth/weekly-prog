const _             = require("lodash")
    , DateFormatter = require("date-formatter");

var checker       = require("./day_checker");


function createKey(date){
  return `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`
}

function groupSessions(sessions){
  let new_sessions = _.sortBy(sessions, (s)=> s.groupBy);
  let date     = _.first(new_sessions).groupBy;
  let key      = createKey(date)
  let groups   = {};
  groups[key] = {date:date, sessions:[]};
  _.forEach(new_sessions, (session)=>{

    if(checker(date, session.groupBy)){
      groups[key].sessions.push(session)
    } else {
      date = session.groupBy;
      key  = createKey(date);
      groups[key] = {date:date, sessions:[session]};

    }

    return groups
  });

  return groups
}


function makeDates(sessions, key){
  return _.map(sessions, (s)=>{
    let date     = new DateFormatter(s[key]);

    s["groupBy"] = date.getDate();

    return s;
  })
}


module.exports = function(sessions, groupBy){
  // console.log(groupBy, sessions)
  let list = makeDates(sessions, groupBy);
  // console.log(list)
  return groupSessions(list);
}