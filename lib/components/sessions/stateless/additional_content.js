'use strict';

var React = require('react');

var timeChecker = require('../../../utils/time_checker'),
    formatter = require('../../../utils/formatter');

// Components
var Time = require('./time'),
    RichText = require('./richtext');

module.exports = function (props) {
  var col = void 0,
      getVal = void 0,
      item = void 0,
      value = void 0;
  item = props.item;
  col = props.col;
  getVal = formatter(item);
  value = getVal(col);

  if (col.type === 'time') {
    return React.createElement(Time, {
      cols: col,
      checker: timeChecker(item, col),
      time: value,
      cancelled: item.has('cancelled')
    });
  }

  return React.createElement(RichText, { content: value });
};