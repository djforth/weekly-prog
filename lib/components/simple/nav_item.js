"use strict";

var React = require("react"),
    _ = require("lodash/core");

var DayDisplay = require('./day_display');

module.exports = function (props) {
  var item = props.nav_item;
  return React.createElement(
    "li",
    { role: "presentation", className: "date-nav-item " + props.active },
    React.createElement(
      "a",
      { href: "#",
        title: item.alt,
        onClick: props.onClick,
        className: "date-nav-item-link"
      },
      React.createElement(DayDisplay, {
        device: props.device,
        date: item.fmt
      })
    )
  );
};
//# sourceMappingURL=nav_item.js.map