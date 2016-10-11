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
;

var _temp = function () {
  if (typeof __REACT_HOT_LOADER__ === 'undefined') {
    return;
  }
}();

;