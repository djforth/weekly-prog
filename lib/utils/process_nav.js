'use strict';

var _ = require('lodash/core');

module.exports = function (items) {
  var txt = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'Sessions for ';

  return _.map(items, function (item, i) {
    item.name = _.clone(item.title);
    item.title = txt + ' ' + item.name;
    item.active = i === 0;
    return item;
  });
};
;

var _temp = function () {
  if (typeof __REACT_HOT_LOADER__ === 'undefined') {
    return;
  }
}();

;