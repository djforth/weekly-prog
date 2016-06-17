'use strict';

var React = require('react');
var RichText = require('./richtext');

module.exports = function (props) {
  return React.createElement(
    'div',
    { className: 'description' },
    React.createElement(RichText, { content: props.content })
  );
};
//# sourceMappingURL=description.js.map