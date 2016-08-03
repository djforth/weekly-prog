'use strict';

var React = require('react');

module.exports = function (props) {
  var key = void 0,
      nosession = void 0;
  key = props.title.toLowerCase() + '-nosessions';
  nosession = props.no_sessions || 'There are no sessions this';
  return React.createElement(
    'div',
    { className: 'cols-lg-12', key: key },
    React.createElement(
      'h5',
      { className: 'no-sessions' },
      nosession,
      ' ',
      props.title
    )
  );
};