'use strict';

var React = require('react');

module.exports = function (props) {
  return React.createElement(
    'header',
    { className: 'section-header' },
    React.createElement(
      'h1',
      { className: 'gg beta secondary' },
      props.title
    )
  );
};
//# sourceMappingURL=period_head.js.map