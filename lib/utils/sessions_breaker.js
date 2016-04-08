'use strict';

var Moment = require('moment-strftime');

var _ = require('lodash/core'),
    includes = require('lodash/includes');

var checker = require('./day_checker');

function createKey(date) {
  return date.getFullYear() + '-' + date.getMonth() + '-' + date.getDate();
}

function groupSessions(sessions) {
  var new_sessions = _.sortBy(sessions, function (s) {
    return s.groupBy;
  });
  var groups = {};
  var ses = _.first(new_sessions);
  if (_.isUndefined(ses) || _.isEmpty(ses)) return groups;
  var date = _.first(new_sessions).groupBy;
  // console.log(date)
  var key = createKey(date);

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

    var date = Moment(s[key]);

    s['groupBy'] = date.toDate();

    return s;
  });
}

function addDay(groups, date) {
  var key = createKey(date.toDate());
  groups[key] = { date: date.clone().toDate(), sessions: [] };

  return groups;
}

function currentDates(dates) {
  dates = _.map(dates, function (d) {
    return Moment(d);
  });

  return function (test) {
    var check = false;
    _.forEach(dates, function (d) {
      if (d.isSame(test, 'd')) {
        check = true;
        return false;
      }
    });

    return check;
  };
}

function fillGaps(groups, start) {
  var end = arguments.length <= 2 || arguments[2] === undefined ? 7 : arguments[2];

  var dates = currentDates(_.map(_.values(groups), 'date'));
  start = _.isUndefined(start) ? _.first(dates) : start;
  start = Moment(start);
  end = start.clone().add(end, 'd');

  do {
    if (!dates(start)) {
      groups = addDay(groups, start);
    }
    start.add(1, 'd');
  } while (start.isBefore(end));
  return groups;
}

module.exports = function (sessions, groupBy, st) {
  // console.log(groupBy, sessions)
  var list = makeDates(sessions, groupBy);
  var groups = groupSessions(list);
  return fillGaps(groups, st);
};