"use strict";

var React = require('react');

module.exports = function (props) {
  return React.createElement(
    "header",
    { className: "section-header" },
    React.createElement(
      "h1",
      { className: "gg beta secondary" },
      props.title
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