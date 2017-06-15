(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['module', 'exports', 'lodash/last', 'lodash/isDate', 'lodash/isArray', 'lodash/reduce', 'lodash/filter', 'lodash/map', 'lodash/find', '../utils/day_checker', './sessions_fcty', 'lodash/partial', 'moment'], factory);
  } else if (typeof exports !== "undefined") {
    factory(module, exports, require('lodash/last'), require('lodash/isDate'), require('lodash/isArray'), require('lodash/reduce'), require('lodash/filter'), require('lodash/map'), require('lodash/find'), require('../utils/day_checker'), require('./sessions_fcty'), require('lodash/partial'), require('moment'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod, mod.exports, global.last, global.isDate, global.isArray, global.reduce, global.filter, global.map, global.find, global.day_checker, global.sessions_fcty, global.partial, global.moment);
    global.date_manager = mod.exports;
  }
})(this, function (module, exports, _last2, _isDate2, _isArray2, _reduce2, _filter2, _map2, _find2, _day_checker, _sessions_fcty, _partial, _moment) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _last3 = _interopRequireDefault(_last2);

  var _isDate3 = _interopRequireDefault(_isDate2);

  var _isArray3 = _interopRequireDefault(_isArray2);

  var _reduce3 = _interopRequireDefault(_reduce2);

  var _filter3 = _interopRequireDefault(_filter2);

  var _map3 = _interopRequireDefault(_map2);

  var _find3 = _interopRequireDefault(_find2);

  var _day_checker2 = _interopRequireDefault(_day_checker);

  var _sessions_fcty2 = _interopRequireDefault(_sessions_fcty);

  var _partial2 = _interopRequireDefault(_partial);

  var _moment2 = _interopRequireDefault(_moment);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  // lodash

  function getDate(dates, date) {
    return (0, _find3.default)(dates, function (d) {
      return (0, _day_checker2.default)(d.date, date);
    });
  }

  /*eslint-disable*/
  function checkDates(dates, date) {
    return getDate(dates, date) ? true : false;
  }
  /*eslint-enable*/

  function createFactory(groupBy) {
    return function (data) {
      var fcty = new _sessions_fcty2.default({}, data);
      fcty.setTimeKey(groupBy);

      return fcty;
    };
  }

  function createWeek(createFcty) {
    var start = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : new Date();

    // var start = new Date();
    var week = [{
      date: start,
      data: createFcty([])
    }];
    var i = 1;

    do {
      start = new Date(start.getTime());
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
    return (0, _map3.default)(dates, function (d) {
      if ((0, _day_checker2.default)(d.date, date)) {
        // console.log(d.data.size(), data.length)
        d.data.add(data);
        // console.log(d.data.size(), data.length)
        d.fetched = true;
      }
      return d;
    });
  }

  function getNewDate(date) {
    var n = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;

    var create_date = new Date(date);
    create_date.setDate(create_date.getDate() + n);
    return create_date;
  }

  function processForNav(dm) {
    var dateFmt = (0, _moment2.default)(dm.date);

    // if (dm.data.size() === 0) console.log('dm', dm)
    return {
      date: dm.date,
      fmt: dateFmt,
      title: dateFmt.format('ddd Do'),
      alt: dateFmt.format('dddd, MMMM Do YYYY'),
      today: (0, _day_checker2.default)(dm.date, new Date()),
      nosessions: dm.data.size() === 0 && !dm.fetched
    };
  }

  function _resetDates(dates) {
    return (0, _filter3.default)(dates, function (dm) {
      return (0, _day_checker2.default)(dm.date, new Date());
    });
  }

  function earliestDate(dates) {
    return (0, _reduce3.default)(dates, function (prev, curr) {
      if (prev.date.getTime() > curr.date.getTime()) {
        return curr;
      }

      return prev;
    });
  }

  function dateManager(groupBy, ds) {
    var _this = this;

    var fctyCreator = createFactory(groupBy);
    var weekCreator = (0, _partial2.default)(createWeek, fctyCreator);
    var dates = (0, _isArray3.default)(ds) ? ds : weekCreator();

    return {
      addDate: function addDate(date, data) {
        if (!(0, _isDate3.default)(date)) return false;

        if (checkDates(dates, date)) {
          var fn = (0, _partial2.default)(dateUpdate, dates);
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

        var fn = (0, _partial2.default)(getDate, dates);
        return fn.apply(_this, args);
      },

      getAll: function getAll() {
        return dates;
      },

      getAllDates: function getAllDates() {
        // let today = new Date();

        dates = dates.sort(function (a, b) {
          if (a.date.getTime() > b.date.getTime()) return 1;
          if (a.date.getTime() < b.date.getTime()) return -1;
          return 0;
        });
        return (0, _map3.default)(dates, function (dm) {
          return processForNav(dm);
        });
      }
      // Should refactor this ADE
      , getMoreDays: function getMoreDays() {
        var fetch_date = (0, _find3.default)(dates, function (dm) {
          return dm.data.size() === 0 && !dm.fetched;
        });
        if (fetch_date) return fetch_date.date;

        var newDates = weekCreator(getNewDate((0, _last3.default)(dates).date));
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

        var fn = (0, _partial2.default)(dateUpdate, dates);
        dates = fn.apply(_this, args);
      }
    };
  }

  exports.default = dateManager;
  module.exports = exports['default'];
});