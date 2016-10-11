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
;

var _temp = function () {
  if (typeof __REACT_HOT_LOADER__ === 'undefined') {
    return;
  }
}();

;