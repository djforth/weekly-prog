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

  // console.log("length",ds.length)
  var dates = _.isArray(ds) ? ds : [];
  return {
    addDate: function addDate(date, data) {
      var fcty = new SessionsFcty({}, data);

      fcty.setTimeKey(groupBy);

      if (checkDates(date)) {
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