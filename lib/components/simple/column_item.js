'use strict';

var React = require('react');

module.exports = function (props) {

  if (value.match(/<|>/g)) {
    return React.createElement('span', { dangerouslySetInnerHTML: { __html: value } });
  }

  return React.createElement(
    'span',
    null,
    'value'
  );
};
//# sourceMappingURL=column_item.js.map