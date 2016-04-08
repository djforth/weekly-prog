'use strict';

var React = require('react');

module.exports = function (props) {
  return React.createElement(
    'a',
    { href: props.url, target: '_blank', className: 'print-prog' },
    React.createElement('i', { className: 'print-prog-icon' }),
    React.createElement(
      'span',
      { className: 'hidden' },
      'Print'
    )
  );
};