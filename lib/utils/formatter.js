"use strict";

var moment = require('moment-strftime'),
    _ = require("lodash/core");

_.partial = require("lodash/partial");

function getFormat(col) {
  if (_.has(col, "fmt")) return col.fmt;

  if (_.has(col, "type") && col.type === "dateTime") {
    return "%d/%m/%Y %H:%M";
  }

  return "%d/%m/%Y";
}

function displayData(data, col) {

  // if(_.isBoolean(data) || data === "true") alert(`${col.key} ${data} ${typeof data}`)
  if (!_.isDate(data)) {

    return data;
  }
  var time = moment(data).strftime(getFormat(col));
  if (!time.match(/\d*:\d*/)) alert(col.key + " " + time);
  // if(col.key === 'start') alert(moment(data).strftime(getFormat(col)))
  return time; //moment(data).strftime(getFormat(col));
}

function getValue(item) {
  var data = item;
  return function (keys) {
    if (_.isString(keys)) return data.get(keys);
    // alert(keys)
    return _.map(keys, function (key) {
      if (!_.isDate(data.get(key))) {
        alert(key + " >>>>>> " + data.toJS());
      }
      return data.get(key);
    });
  };
}

function concatValues(item, col) {
  var concat = item([col.key, col.concat]);
  // alert(concat)
  var val = _.map(concat, function (d) {
    var data = displayData(d, col);
    return data;
  });

  if (val === "true -  true") {
    alert("Value: " + val);
  }

  return val.join(" " + col.split + " ");
}

module.exports = function (item) {
  var value = getValue(item);

  return function (col) {

    return _.has(col, "concat") ? concatValues(value, col) : value(col.key);
  };
};
//# sourceMappingURL=formatter.js.map