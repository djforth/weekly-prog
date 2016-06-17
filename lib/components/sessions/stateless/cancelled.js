'use strict';

var React = require('react');

module.exports = function (props) {
  var title = 'The session between ' + props.time + ' is cancelled';
  return React.createElement(
    'span',
    { title: title },
    'Cancelled'
  );
};