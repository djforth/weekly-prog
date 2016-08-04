"use strict";

var React = require('react');

module.exports = function (props) {
  return React.createElement(
    "div",
    { className: props.css },
    React.createElement(
      "a",
      { href: "#", onClick: props.onClick, className: "button button-pagination" },
      "Load More"
    )
  );
};
//# sourceMappingURL=paginate.js.map