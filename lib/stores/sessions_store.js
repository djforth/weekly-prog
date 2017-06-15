(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['module', 'exports', 'lodash/isString', 'lodash/isUndefined', 'lodash/reduce', 'lodash/isFunction', 'lodash/isDate', 'lodash/filter', 'lodash/isEmpty', 'lodash/values', 'lodash/forEach', 'events', '../utils/ajax_manager', '../factories/date_manager', '../utils/sessions_breaker', '../dispatchers/sessions_dispatcher'], factory);
  } else if (typeof exports !== "undefined") {
    factory(module, exports, require('lodash/isString'), require('lodash/isUndefined'), require('lodash/reduce'), require('lodash/isFunction'), require('lodash/isDate'), require('lodash/filter'), require('lodash/isEmpty'), require('lodash/values'), require('lodash/forEach'), require('events'), require('../utils/ajax_manager'), require('../factories/date_manager'), require('../utils/sessions_breaker'), require('../dispatchers/sessions_dispatcher'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod, mod.exports, global.isString, global.isUndefined, global.reduce, global.isFunction, global.isDate, global.filter, global.isEmpty, global.values, global.forEach, global.events, global.ajax_manager, global.date_manager, global.sessions_breaker, global.sessions_dispatcher);
    global.sessions_store = mod.exports;
  }
})(this, function (module, exports, _isString2, _isUndefined2, _reduce2, _isFunction2, _isDate2, _filter2, _isEmpty2, _values2, _forEach2, _events, _ajax_manager, _date_manager, _sessions_breaker, _sessions_dispatcher) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _isString3 = _interopRequireDefault(_isString2);

  var _isUndefined3 = _interopRequireDefault(_isUndefined2);

  var _reduce3 = _interopRequireDefault(_reduce2);

  var _isFunction3 = _interopRequireDefault(_isFunction2);

  var _isDate3 = _interopRequireDefault(_isDate2);

  var _filter3 = _interopRequireDefault(_filter2);

  var _isEmpty3 = _interopRequireDefault(_isEmpty2);

  var _values3 = _interopRequireDefault(_values2);

  var _forEach3 = _interopRequireDefault(_forEach2);

  var _ajax_manager2 = _interopRequireDefault(_ajax_manager);

  var _date_manager2 = _interopRequireDefault(_date_manager);

  var _sessions_breaker2 = _interopRequireDefault(_sessions_breaker);

  var _sessions_dispatcher2 = _interopRequireDefault(_sessions_dispatcher);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  // Internal Modules
  var ajaxManager = void 0,
      processor = void 0,
      sessions = void 0,
      facility = void 0;

  // Flux


  var fetched = false;

  function processData(groupBy) {
    var sessions = (0, _date_manager2.default)(groupBy);

    return function (d, date) {
      var reset = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

      if (reset) sessions.resetDates();

      var groups = (0, _sessions_breaker2.default)(d, groupBy, date);
      (0, _forEach3.default)((0, _values3.default)(groups), function (ses) {
        sessions.addDate(ses.date, ses.sessions);
      });

      return sessions;
    };
  }

  function processDates(dates) {
    if ((0, _isEmpty3.default)(dates)) return dates;
    var yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    return (0, _filter3.default)(dates, function (d) {
      return d.date.getTime() >= yesterday.getTime();
    });
  }

  function currentDate(date) {
    var current = (0, _isDate3.default)(date) ? date : new Date();

    return {
      getDate: function getDate() {
        return current;
      },
      setDate: function setDate(d) {
        current = (0, _isDate3.default)(d) ? d : current;
      }
    };
  }

  var store = {
    emitChange: function emitChange(event) {
      this.emit(event);
    },
    addChangeListener: function addChangeListener(event, callback) {
      this.on(event, callback);
    },
    removeChangeListener: function removeChangeListener(event, callback) {
      this.removeListener(event, callback);
    },
    _addSessions: function _addSessions(data) {
      if ((0, _isFunction3.default)(processor)) {
        sessions = processor(data);
      }
    },
    _calendarChange: function _calendarChange(date) {
      this._setDate(date);
      this._fetchData(date, true);
    },
    _fetchData: function _fetchData(date) {
      var _this = this;

      var reset = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

      if (!ajaxManager) {
        throw new Error('please set API path');
      }

      ajaxManager.addQuery(date);
      var request = ajaxManager.fetch();

      if (request) {
        return request.then(function (data) {
          fetched = true;
          sessions = processor(data, date, reset);

          _this.emitChange('fetched');

          return sessions.getAllDates();
        }).then(function (data) {
          _this._fetchRest(data);
          return data;
        });
      }
    },
    _fetchNowNext: function _fetchNowNext() {
      var _this2 = this;

      ajaxManager.fetch().then(function (data) {
        fetched = true;
        sessions = processor(data, false);

        _this2.emitChange('fetched');
      });
    },
    _fetchRest: function _fetchRest(dates) {
      var fetch = (0, _filter3.default)(dates, function (d) {
        return d.nosessions;
      });
      fetch = (0, _reduce3.default)(fetch, function (prev, curr) {
        if (prev.date.getTime() > curr.date.getTime()) {
          return curr;
        }

        return prev;
      });

      if (fetch) this._fetchData(fetch.date);
    },
    _getCurrentDate: function _getCurrentDate() {
      return this.current.getDate();
    },
    _getDate: function _getDate(date) {
      if (!this.current) {
        this.current = currentDate(date);
      }
      this.current.setDate(date);
      if (sessions) {
        var current_day = sessions.findDate(this.current.getDate());
        if (current_day) return current_day;
      }

      if (fetched) {
        this._fetchData(this.current.getDate());
        this.emitChange('fetching');
      } else {
        return [];
      }

      return null;
    },
    _getFacility: function _getFacility() {
      return sessions.findDate(new Date()).data.filter('facility', facility);
    },
    _getMoreDays: function _getMoreDays() {
      if (fetched) {
        var date = sessions.getMoreDays();
        if ((0, _isDate3.default)(date)) this._fetchData(date);
      }
    },
    _getPreviousDays: function _getPreviousDays(date) {
      var d = sessions.getPreviousDays(date);
      if ((0, _isDate3.default)(d)) {
        this._fetchData(d);
      }
    },
    _getAllDates: function _getAllDates() {
      if ((0, _isUndefined3.default)(sessions)) return [new Date()];
      return processDates(sessions.getAllDates());
    },
    _setApi: function _setApi(api) {
      ajaxManager = (0, _ajax_manager2.default)(api);
    },
    _setDate: function _setDate(date) {
      if (!this.current) {
        this.current = currentDate(date);
      }
      this.current.setDate(date);
    },
    _setFacility: function _setFacility(id) {
      facility = id;
    },
    _setGroups: function _setGroups(groupBy) {
      if (!(0, _isString3.default)(groupBy)) return;
      processor = processData(groupBy);
    },
    _progress: function _progress(prog) {
      if (!(0, _isFunction3.default)(prog)) return;
      this.progress = prog;
    }
  };

  var SessionStore = Object.assign({}, _events.EventEmitter.prototype, store);
  SessionStore.setMaxListeners(0);

  var registeredCallback = function registeredCallback(payload) {
    var action = payload.action;
    switch (action.type) {
      case 'CHANGE_DATE':
        SessionStore._setDate(action.date);
        SessionStore.emitChange('changing_date');
        break;
      case 'CALENDAR_CHANGE':
        SessionStore._calendarChange(action.date);
        SessionStore.emitChange('calendar_changing');
        break;
      case 'FETCH_DATA':
        if (action.progress) SessionStore._progress(action.progress);
        SessionStore._fetchData(action.date);
        SessionStore.emitChange('fetching');
        break;

      case 'FETCH_NOWNEXT':
        if (action.progress) SessionStore._progress(action.progress);
        SessionStore._fetchNowNext();
        SessionStore.emitChange('fetching_nownext');
        break;

      case 'MORE_DAYS':
        SessionStore._getMoreDays();
        SessionStore.emitChange('more_days');
        break;

      case 'PREVIOUS_DAYS':
        SessionStore._getPreviousDays(action.date);
        SessionStore.emitChange('previous_days');
        break;

      case 'PRERENDER_DATA':
        SessionStore._addSessions(action.data);
        SessionStore.emitChange('prerender');
        break;

      case 'SET_FACILITY':
        SessionStore._setFacility(action.id);
        SessionStore.emitChange('set_facility');
        break;

      case 'SET_GROUPBY':
        SessionStore._setGroups(action.groupBy);
        SessionStore.emitChange('groupby');
        break;
      case 'SET_API':
        SessionStore._setApi(action.url);
        SessionStore.emitChange('api_set');

        break;
      default:
        throw new Error('No Action');
    }
  };

  SessionStore.dispatchToken = _sessions_dispatcher2.default.register(registeredCallback);
  SessionStore.setMaxListeners(0);

  exports.default = SessionStore;
  module.exports = exports['default'];
});