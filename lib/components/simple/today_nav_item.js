"use strict";

var React = require("react"),
    _ = require("lodash/core");

var TodayDisplay = require('./today_display');

module.exports = function (props) {
  var item = props.nav_item;
  return React.createElement(
    "div",
    { role: "presentation", className: "date-nav-item today-nav " + props.active },
    React.createElement(
      "a",
      { href: "#",
        title: item.alt,
        onClick: props.onClick,
        className: "date-nav-item-link"
      },
      React.createElement(TodayDisplay, {
        device: props.device,
        date: item.fmt
      })
    )
  );
};
//# sourceMappingURL=today_nav_item.js.map