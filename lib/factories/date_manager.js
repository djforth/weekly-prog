"use strict";

var _ = require("lodash"),
    checker = require("../utils/day_checker"),
    SessionsFcty = require("./sessions_fcty");

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

function createFirstWeek(createFcty) {
  var start = new Date();
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
      data: createFcty()
    });

    i++;
  } while (i < 7);

  return week;
}

function dateUpdate(dates, date, data) {
  return _.map(dates, function (d) {
    if (checker(d.date, date)) {
      d.data = data;
    }
    return d;
  });
}

function dateManager(groupBy, ds) {
  var _this = this;

  var fctyCreator = createFactory(groupBy);

  var dates = _.isArray(ds) ? ds : createFirstWeek(fctyCreator);
  return {
    addDate: function addDate(date, data) {
      if (!_.isDate(date)) return false;
      var fcty = fctyCreator(data);
      if (checkDates(dates, date)) {
        var fn = _.partial(dateUpdate, dates);
        dates = fn(date, fcty);
      } else {
        dates.push({ date: date, data: fcty });
      }
    },

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
      return _.pluck(dates, "date");
    }

    // , getRange:(st, fn)=>{
    //   return _.filter(dates,
    // }

    , updateDate: function updateDate() {
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