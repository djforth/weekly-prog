'use strict';

var Ajax = require('ajax-es6-module'),
    Moment = require('moment');

var _ = require('lodash/core'),
    includes = require('lodash/includes'),
    reject = require('lodash/reject');

var ajaxManager = new Ajax();

var currentRequests = [];

function setApi(api, date) {
  if (!_.isDate(date)) return api;

  var dateFmt = Moment(date);
  var path = dateFmt.format('/YYYY/MM/DD[.json]');
  return api.replace(/.json/, path);
}

module.exports = function (api) {
  if (!api) {
    throw new Error('api url required');
  }

  var progress = void 0,
      date = void 0;

  return {
    addProgress: function addProgress(p) {
      progress = _.isFunction(p) ? p : null;
      return progress;
    },

    addQuery: function addQuery(d) {
      date = _.isDate(d) ? d : null;
      return date;
    },

    fetch: function fetch() {
      var url = setApi(api, date);
      if (includes(currentRequests, url)) return null;
      currentRequests.push(url);
      ajaxManager.addUrl(setApi(api, date));

      return ajaxManager.fetch(progress).then(function (data) {
        currentRequests = reject(currentRequests, function (cr) {
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
;

var _temp = function () {
  if (typeof __REACT_HOT_LOADER__ === 'undefined') {
    return;
  }

  __REACT_HOT_LOADER__.register(ajaxManager, 'ajaxManager', 'src/utils/ajax_manager.js');

  __REACT_HOT_LOADER__.register(currentRequests, 'currentRequests', 'src/utils/ajax_manager.js');

  __REACT_HOT_LOADER__.register(setApi, 'setApi', 'src/utils/ajax_manager.js');
}();

;