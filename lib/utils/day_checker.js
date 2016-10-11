'use strict';

var _ = require('lodash/core');
var checkers = ['getDate', 'getMonth', 'getFullYear'];

module.exports = function (check, checkee) {
  var test = false;

  _.forEach(checkers, function (checker) {
    test = check[checker]() === checkee[checker]();
    return test;
  });

  return test;
};
;

var _temp = function () {
  if (typeof __REACT_HOT_LOADER__ === 'undefined') {
    return;
  }

  __REACT_HOT_LOADER__.register(checkers, 'checkers', 'src/utils/day_checker.js');
}();

;