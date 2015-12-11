"use strict";

var _ = require("lodash"),
    checker = require("../utils/day_checker"),
    SessionsFcty = require("./sessions_fcty"),
    DateFormatter = require("date-formatter"),
    Moment = require("moment");

function getDate(dates, date) {
  return _.find(dates, function (d) {
    return checker(d.date, date);
  });
}

function checkDates(dates, date) {

  return getDate(dates, date) ? true : false;
}

function createFactory(groupBy) {
  return function (data) {
    var fcty = new SessionsFcty({}, data);
    fcty.setTimeKey(groupBy);

    return fcty;
  };
}

function createWeek(createFcty) {
  var start = arguments.length <= 1 || arguments[1] === undefined ? new Date() : arguments[1];

  // var start = new Date();
  var week = [{
    date: start,
    data: createFcty([])
  }];
  var i = 1;

  do {
    start = _.clone(start);
    start.setDate(start.getDate() + 1);
    week.push({
      date: start,
      data: createFcty(),
      fetched: false
    });

    i++;
  } while (i < 7);

  return week;
}

function dateUpdate(dates, date, data) {

  return _.map(dates, function (d) {
    if (checker(d.date, date)) {
      // console.log(d.data.size(), data.length)
      d.data.add(data);
      // console.log(d.data.size(), data.length)
      d.fetched = true;
    }
    return d;
  });
}

function getNewDate(date) {
  var n = arguments.length <= 1 || arguments[1] === undefined ? 1 : arguments[1];

  var create_date = _.clone(date);
  create_date.setDate(create_date.getDate() + n);
  return create_date;
}

function processForNav(dm) {
  var dateFmt = Moment(dm.date);
  return {
    date: dm.date,
    fmt: dateFmt,
    title: dateFmt.format("ddd Do"),
    alt: dateFmt.format("dddd, MMMM Do YYYY"),
    today: checker(dm.date, new Date()),
    nosessions: dm.data.size() === 0 && !dm.fetched
  };
}

function _resetDates(dates) {
  return _.filter(dates, function (dm) {
    return checker(dm.date, new Date());
  });
}

function earliestDate(dates) {
  return _.reduce(dates, function (prev, curr) {
    if (prev.date.getTime() > curr.date.getTime()) {
      return curr;
    }

    return prev;
  });
}

function dateManager(groupBy, ds) {
  var _this = this;

  var fctyCreator = createFactory(groupBy);
  var weekCreator = _.partial(createWeek, fctyCreator);
  var dates = _.isArray(ds) ? ds : weekCreator();

  return {
    addDate: function addDate(date, data) {
      if (!_.isDate(date)) return false;

      if (checkDates(dates, date)) {
        var fn = _.partial(dateUpdate, dates);
        dates = fn(date, data);
      } else {
        var fcty = fctyCreator(data);
        dates.push({ date: date, data: fcty, fetched: true });
      }
    },

    createWeek: weekCreator,

    findDate: function findDate() {
      for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      var fn = _.partial(getDate, dates);
      return fn.apply(_this, args);
    },

    getAll: function getAll() {
      return dates;
    },

    getAllDates: function getAllDates() {
      var today = new Date();

      dates = dates.sort(function (a, b) {
        if (a.date.getTime() > b.date.getTime()) return 1;
        if (a.date.getTime() < b.date.getTime()) return -1;
        return 0;
      });
      return _.map(dates, function (dm) {
        return processForNav(dm);
      });
    }
    // Should refactor this ADE
    , getMoreDays: function getMoreDays() {
      var fetch_date = _.find(dates, function (dm) {
        return dm.data.size() === 0 && !dm.fetched;
      });
      if (fetch_date) return fetch_date.date;

      var newDates = weekCreator(getNewDate(_.last(dates).date));
      dates = dates.concat(newDates);

      return earliestDate(newDates).date;
    },
    getPreviousDays: function getPreviousDays(date) {
      var newDates = weekCreator(getNewDate(date, -7));
      dates = dates.concat(newDates);
      return earliestDate(newDates).date;
    },
    resetDates: function resetDates() {
      dates = _resetDates(dates);
    },
    updateDate: function updateDate() {
      for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
        args[_key2] = arguments[_key2];
      }

      var fn = _.partial(dateUpdate, dates);
      dates = fn.apply(_this, args);
    }
  };
}

module.exports = dateManager;
//# sourceMappingURL=date_manager.js.map