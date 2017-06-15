(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['module', 'exports', 'lodash/values', 'lodash/map', 'lodash/forEach', 'lodash/isEmpty', 'lodash/isUndefined', 'lodash/first', 'lodash/sortBy', 'moment-strftime', './day_checker'], factory);
  } else if (typeof exports !== "undefined") {
    factory(module, exports, require('lodash/values'), require('lodash/map'), require('lodash/forEach'), require('lodash/isEmpty'), require('lodash/isUndefined'), require('lodash/first'), require('lodash/sortBy'), require('moment-strftime'), require('./day_checker'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod, mod.exports, global.values, global.map, global.forEach, global.isEmpty, global.isUndefined, global.first, global.sortBy, global.momentStrftime, global.day_checker);
    global.sessions_breaker = mod.exports;
  }
})(this, function (module, exports, _values2, _map2, _forEach2, _isEmpty2, _isUndefined2, _first2, _sortBy2, _momentStrftime, _day_checker) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  exports.default = function (sessions, groupBy, st) {
    var list = makeDates(sessions, groupBy);
    var groups = groupSessions(list);
    return fillGaps(groups, st);
  };

  var _values3 = _interopRequireDefault(_values2);

  var _map3 = _interopRequireDefault(_map2);

  var _forEach3 = _interopRequireDefault(_forEach2);

  var _isEmpty3 = _interopRequireDefault(_isEmpty2);

  var _isUndefined3 = _interopRequireDefault(_isUndefined2);

  var _first3 = _interopRequireDefault(_first2);

  var _sortBy3 = _interopRequireDefault(_sortBy2);

  var _momentStrftime2 = _interopRequireDefault(_momentStrftime);

  var _day_checker2 = _interopRequireDefault(_day_checker);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  function createKey(date) {
    return date.getFullYear() + '-' + date.getMonth() + '-' + date.getDate();
  }

  function groupSessions(sessions) {
    var new_sessions = (0, _sortBy3.default)(sessions, function (s) {
      return s.groupBy;
    });
    var groups = {};
    var ses = (0, _first3.default)(new_sessions);
    if ((0, _isUndefined3.default)(ses) || (0, _isEmpty3.default)(ses)) return groups;
    var date = (0, _first3.default)(new_sessions).groupBy;
    var key = createKey(date);

    groups[key] = { date: date, sessions: [] };
    (0, _forEach3.default)(new_sessions, function (session) {
      if ((0, _day_checker2.default)(date, session.groupBy)) {
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
    return (0, _map3.default)(sessions, function (s) {
      var date = (0, _momentStrftime2.default)(s[key]);

      s.groupBy = date.toDate();

      return s;
    });
  }

  function addDay(groups, date) {
    var key = createKey(date.toDate());
    groups[key] = { date: date.clone().toDate(), sessions: [] };

    return groups;
  }

  function currentDates(dates) {
    dates = (0, _map3.default)(dates, function (d) {
      return (0, _momentStrftime2.default)(d);
    });

    return function (test) {
      var check = false;
      (0, _forEach3.default)(dates, function (d) {
        if (d.isSame(test, 'd')) {
          check = true;
          return false;
        }
      });

      return check;
    };
  }

  function fillGaps(groups, start) {
    var end = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 7;

    var dates = currentDates((0, _map3.default)((0, _values3.default)(groups), 'date'));
    start = (0, _isUndefined3.default)(start) ? (0, _first3.default)(dates) : start;
    start = (0, _momentStrftime2.default)(start);
    end = start.clone().add(end, 'd');

    do {
      if (!dates(start)) {
        groups = addDay(groups, start);
      }
      start.add(1, 'd');
    } while (start.isBefore(end));
    return groups;
  }

  ;
  module.exports = exports['default'];
});