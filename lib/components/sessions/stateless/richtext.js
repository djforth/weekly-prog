'use strict';

var _ = require('lodash/core'),
    React = require('react');

function createMarkup(content) {
  return { __html: content };
};

module.exports = function (props) {

  if (_.isString(props.content) && props.content.match(/<|>/g)) {
    return React.createElement('div', { dangerouslySetInnerHTML: createMarkup(props.content) });
  }

  return React.createElement(
    'span',
    null,
    props.content
  );
};
//# sourceMappingURL=richtext.js.map