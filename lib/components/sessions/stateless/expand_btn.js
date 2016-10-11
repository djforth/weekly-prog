"use strict";

var React = require('react');

module.exports = function (props) {
  return React.createElement(
    "div",
    { className: props.css },
    React.createElement(
      "a",
      { href: "#",
        onClick: props.expand,
        className: "icon icon-information",
        title: props.text },
      React.createElement(
        "span",
        { className: "hidden" },
        props.text
      )
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