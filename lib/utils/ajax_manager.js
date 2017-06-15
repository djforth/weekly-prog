(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['module', 'exports', 'lodash/isFunction', 'lodash/isDate', 'ajax-es6-module', 'moment', 'lodash/includes', 'lodash/reject'], factory);
  } else if (typeof exports !== "undefined") {
    factory(module, exports, require('lodash/isFunction'), require('lodash/isDate'), require('ajax-es6-module'), require('moment'), require('lodash/includes'), require('lodash/reject'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod, mod.exports, global.isFunction, global.isDate, global.ajaxEs6Module, global.moment, global.includes, global.reject);
    global.ajax_manager = mod.exports;
  }
})(this, function (module, exports, _isFunction2, _isDate2, _ajaxEs6Module, _moment, _includes, _reject) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  exports.default = function (api) {
    if (!api) {
      throw new Error('api url required');
    }

    var progress = void 0,
        date = void 0;

    return {
      addProgress: function addProgress(p) {
        progress = (0, _isFunction3.default)(p) ? p : null;
        return progress;
      },

      addQuery: function addQuery(d) {
        date = (0, _isDate3.default)(d) ? d : null;
        return date;
      },

      fetch: function fetch() {
        var url = setApi(api, date);
        if ((0, _includes2.default)(currentRequests, url)) return null;
        currentRequests.push(url);
        ajaxManager.addUrl(setApi(api, date));

        return ajaxManager.fetch(progress).then(function (data) {
          currentRequests = (0, _reject2.default)(currentRequests, function (cr) {
            return cr === url;
          });
          // console.log(currentRequests)
          return data;
        }).catch(function (err) {
          throw new Error(err);
        });
      }
    };
  };

  var _isFunction3 = _interopRequireDefault(_isFunction2);

  var _isDate3 = _interopRequireDefault(_isDate2);

  var _ajaxEs6Module2 = _interopRequireDefault(_ajaxEs6Module);

  var _moment2 = _interopRequireDefault(_moment);

  var _includes2 = _interopRequireDefault(_includes);

  var _reject2 = _interopRequireDefault(_reject);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  var ajaxManager = new _ajaxEs6Module2.default();

  var currentRequests = [];

  function setApi(api, date) {
    if (!(0, _isDate3.default)(date)) return api;

    var dateFmt = (0, _moment2.default)(date);
    var path = dateFmt.format('/YYYY/MM/DD[.json]');
    return api.replace(/.json/, path);
  }

  ;
  module.exports = exports['default'];
});