
import React from 'react';

export default function (props) {
  var fmt = props.date;
  if (props.device === 'mobile') {
    return React.createElement(
      'span',
      null,
      React.createElement(
        'span',
        { className: 'nav-date' },
        fmt.format('DD')
      ),
      React.createElement(
        'span',
        { className: 'nav-day' },
        fmt.format('ddd')
      )
    );
  }

  return React.createElement(
    'span',
    null,
    fmt.format('ddd Do')
  );
};