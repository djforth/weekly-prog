'use strict';

var React, TodayDisplay;
React = require('react');
TodayDisplay = require('./today_display');

module.exports = function (props) {
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
;

var _temp = function () {
  if (typeof __REACT_HOT_LOADER__ === 'undefined') {
    return;
  }

  __REACT_HOT_LOADER__.register(React, 'React', 'src/components/nav/stateless/today_nav_item.js');

  __REACT_HOT_LOADER__.register(TodayDisplay, 'TodayDisplay', 'src/components/nav/stateless/today_nav_item.js');
}();

;