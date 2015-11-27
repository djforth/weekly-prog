"use strict";

var Ajax = require("ajax-es6-module"),
    _ = require("lodash");

var ajaxManager = new Ajax();

function setApi(api, date) {
  return _.isString(date) ? api + "?date=" + date : api;
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
      date = _.isDate(d) ? d.toJSON() : null;
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