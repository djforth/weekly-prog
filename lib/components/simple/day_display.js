"use strict";

var React = require("react"),
    _ = require("lodash/core");

module.exports = function (props) {
  var fmt = props.date;
  if (props.device === "mobile") {
    return React.createElement(
      "span",
      null,
      React.createElement(
        "span",
        { className: "nav-date" },
        fmt.format("DD")
      ),
      React.createElement(
        "span",
        { className: "nav-day" },
        fmt.format("ddd")
      )
    );
  } else {
    return React.createElement(
      "span",
      null,
      fmt.format("ddd Do")
    );
  }
};
//# sourceMappingURL=day_display.js.map