"use strict";

var _ = require("lodash"),
    DateFormatter = require("date-formatter");

var checker = require("./day_checker");

function createKey(date) {
  return date.getFullYear() + "-" + date.getMonth() + "-" + date.getDate();
}

function groupSessions(sessions) {
  var new_sessions = _.sortBy(sessions, function (s) {
    return s.groupBy;
  });
  var date = _.first(new_sessions).groupBy;
  var key = createKey(date);
  var groups = {};
  groups[key] = { date: date, sessions: [] };
  _.forEach(new_sessions, function (session) {

    if (checker(date, session.groupBy)) {
      groups[key].sessions.push(session);
    } else {
      date = session.groupBy;
      key = createKey(date);
      groups[key] = { date: date, sessions: [session] };
    }

    return groups;
  });

  return groups;
}

function makeDates(sessions, key) {
  return _.map(sessions, function (s) {
    var date = new DateFormatter(s[key]);

    s["groupBy"] = date.getDate();

    return s;
  });
}

module.exports = function (sessions, groupBy) {
  // console.log(groupBy, sessions)
  var list = makeDates(sessions, groupBy);
  // console.log(list)
  return groupSessions(list);
};
//# sourceMappingURL=sessions_breaker.js.map