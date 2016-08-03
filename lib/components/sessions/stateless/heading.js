'use strict';

var React = require('react');

module.exports = function (props) {
  return React.createElement(
    'div',
    { className: props.css },
    props.title
  );
};