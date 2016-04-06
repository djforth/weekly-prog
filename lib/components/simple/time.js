"use strict";

var React = require('react');

var timeChecker = require("../../utils/time_checker"),
    formatter = require("../../utils/formatter");

var Cancelled = require('./cancelled');

function titleCreator(checker, time) {
  return checker.setNowOrPast("This session has started", "This session has finished", "This sessions runs between " + time);
}

module.exports = function (props) {

  if (props.cancelled) {
    React.createElement(Cancelled, { time: props.time });
  }

  return React.createElement(
    "span",
    { title: titleCreator(props.checker, props.time) },
    props.time
  );
};
//# sourceMappingURL=time.js.map