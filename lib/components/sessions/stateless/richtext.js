'use strict';

var _ = require('lodash/core'),
    React = require('react');

function createMarkup(content) {
  return { __html: content };
}

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
;

var _temp = function () {
  if (typeof __REACT_HOT_LOADER__ === 'undefined') {
    return;
  }

  __REACT_HOT_LOADER__.register(createMarkup, 'createMarkup', 'src/components/sessions/stateless/richtext.js');
}();

;