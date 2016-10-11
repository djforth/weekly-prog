'use strict';

var React = require('react');

var Cancelled = require('./cancelled');

function titleCreator(checker, time) {
  return checker.setNowOrPast('This session has started', 'This session has finished', 'This sessions runs between ' + time);
}

module.exports = function (props) {
  if (props.cancelled) {
    return React.createElement(Cancelled, { time: props.time });
  }

  return React.createElement(
    'span',
    { title: titleCreator(props.checker, props.time) },
    props.time
  );
};
;

var _temp = function () {
  if (typeof __REACT_HOT_LOADER__ === 'undefined') {
    return;
  }

  __REACT_HOT_LOADER__.register(titleCreator, 'titleCreator', 'src/components/sessions/stateless/time.js');
}();

;