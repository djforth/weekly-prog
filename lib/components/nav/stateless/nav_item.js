
import React from 'react';

import DayDisplay from './day_display';

export default function (props) {
  var item = props.nav_item;
  return React.createElement(
    'li',
    { role: 'presentation', className: 'date-nav-item ' + props.active },
    React.createElement(
      'a',
      { href: '#',
        title: item.alt,
        onClick: props.onClick,
        className: 'date-nav-item-link'
      },
      React.createElement(DayDisplay, {
        device: props.device,
        date: item.fmt
      })
    )
  );
};