'use strict';

var React = require('react'),
    _ = require('lodash/core');

module.exports = function (props) {
  return React.createElement(
    'div',
    { className: 'loading' },
    React.createElement(
      'span',
      { className: 'hidden' },
      'Loading ',
      props.alt
    )
  );
};
//# sourceMappingURL=loader.js.map