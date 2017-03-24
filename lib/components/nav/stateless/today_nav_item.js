import React from 'react';
import TodayDisplay from './today_display';

export default function (props) {
  var css = void 0,
      item = void 0;
  item = props.nav_item;
  css = 'date-nav-item today-nav ' + props.active;
  return React.createElement(
    'div',
    { role: 'presentation', className: css },
    React.createElement(
      'a',
      { href: '#',
        title: item.alt,
        onClick: props.onClick,
        className: 'date-nav-item-link'
      },
      React.createElement(TodayDisplay, {
        device: props.device,
        date: item.fmt
      })
    )
  );
};
//# sourceMappingURL=today_nav_item.js.map