'use strict';

var React = require('react');

module.exports = function (props) {
  return React.createElement(
    'div',
    { className: 'cols-lg-12', key: props.title.toLowerCase() + '-nosessions' },
    React.createElement(
      'h5',
      { className: 'no-sessions' },
      props.no_sessions || 'There are no sessions this',
      ' ',
      props.title
    )
  );
};
//# sourceMappingURL=no_sessions.js.map