
import React from 'react';

import timeChecker from '../../../utils/time_checker';

import formatter from '../../../utils/formatter';

// Components

import Time from './time';

import RichText from './richtext';

export default function (props) {
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