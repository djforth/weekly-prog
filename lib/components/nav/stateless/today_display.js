"use strict";

var React = require("react");

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
        "Today"
      )
    );
  } else {
    return React.createElement(
      "span",
      null,
      "Today " + fmt.format("Do")
    );
  }
};
//# sourceMappingURL=today_display.js.map