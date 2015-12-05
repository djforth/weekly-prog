"use strict";

var Ajax = require("ajax-es6-module"),
    _ = require("lodash"),
    DateFormatter = require("date-formatter");

var ajaxManager = new Ajax();

function setApi(api, date) {
  if (!_.isDate(date)) return api;

  var dateFmt = new DateFormatter(date);
  var path = dateFmt.formatDate("/%Y/%m/%d.json");
  return api.replace(/.json/, path);
}

module.exports = function (api) {
  if (!api) {
    throw new Error("api url required");
  }

  var progress = undefined,
      date = undefined;

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
      ajaxManager.addUrl(setApi(api, date));
      return ajaxManager.fetch(progress).catch(function (err) {
        throw new Error(err);
      });
    }

  };
};
//# sourceMappingURL=ajax_manager.js.map