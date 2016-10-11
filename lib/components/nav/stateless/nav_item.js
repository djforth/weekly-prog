'use strict';

var React = require('react');

var DayDisplay = require('./day_display');

module.exports = function (props) {
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
;

var _temp = function () {
  if (typeof __REACT_HOT_LOADER__ === 'undefined') {
    return;
  }
}();

;