'use strict';

var _ = require('lodash/core'),
    React = require('react');

var timeChecker = require('../../../utils/time_checker');

function setCss(item, col) {
  if (!_.has(col, 'wrapper')) return '';

  if (!col.type === 'time' || _.isUndefined(col.concat)) return col.wrapper;

  var checker = timeChecker(item, col);
  return col.wrapper + ' ' + checker.setNowOrPast('now', 'old-session');
}

module.exports = function (props) {
  var css = setCss(props.item, props.col);
  return React.createElement(
    'div',
    { className: css },
    props.children
  );
};
//# sourceMappingURL=wrapper.js.map